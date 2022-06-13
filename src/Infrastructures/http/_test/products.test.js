const pool = require('../../database/postgres/pool');
const ProductTableTestHelper = require('../../../../tests/ProductTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const container = require('../../container');
const createServer = require('../createServer');

describe('/products endpoint', () => {
  afterAll(async () => {
    await pool.end();
  });

  afterEach(async () => {
    await ProductTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
  });

  describe('when POST /products', () => {
    it('should response 401 if payload not access token', async () => {
      // Arrange
      const server = await createServer(container);
      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/products',
        payload: {},
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(401);
      expect(responseJson.error).toEqual('Unauthorized');
      expect(responseJson.message).toEqual('Missing authentication');
    });
    it('should response 400 when request payload not contain needed property', async () => {
      // Arrange
      // initial server
      const server = await createServer(container);
      await server.inject({
        method: 'POST',
        url: '/users',
        payload: {
          username: 'albert',
          password: 'secret',
          fullname: 'albert anugerah',
        },
      });

      // login
      const authentication = await server.inject({
        method: 'POST',
        url: '/authentications',
        payload: {
          username: 'albert',
          password: 'secret',
        },
      });
      const responseAuth = JSON.parse(authentication.payload);

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/products',
        payload: {},
        headers: { Authorization: `Bearer ${responseAuth.data.accessToken}` },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('tidak dapat membuat produk baru karena properti yang dibutuhkan tidak ada');
    });

    it('should response 400 when request payload not meet data type specification', async () => {
      // Arrange
      const server = await createServer(container);
      await server.inject({
        method: 'POST',
        url: '/users',
        payload: {
          username: 'albert',
          password: 'secret',
          fullname: 'albert anugerah',
        },
      });

      const requestPayload = {
        name: 'dicoding',
        sku: 123,
        image: 'ini_image.jpg',
        price: true,
        description: ['ini description'],
      };
      const authentication = await server.inject({
        method: 'POST',
        url: '/authentications',
        payload: {
          username: 'albert',
          password: 'secret',
        },
      });

      const responseAuth = JSON.parse(authentication.payload);

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/products',
        payload: requestPayload,
        headers: { Authorization: `Bearer ${responseAuth.data.accessToken}` },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('tidak dapat membuat produk baru karena tipe data tidak sesuai');
    });

    it('should response 201 and persisted user', async () => {
      // Arrange
      const loginPayload = {
        username: 'albert',
        password: 'secret',
      };
      const server = await createServer(container);

      await server.inject({
        method: 'POST',
        url: '/users',
        payload: {
          username: 'albert',
          password: 'secret',
          fullname: 'albert anugerah',
        },
      });
      const authentication = await server.inject({
        method: 'POST',
        url: '/authentications',
        payload: loginPayload,
      });

      const responseAuth = JSON.parse(authentication.payload);

      const requestPayload = {
        name: 'Obat Mata',
        sku: 1234,
        image: 'ini image',
        price: 1234,
        description: 'test',
      };

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/products',
        payload: requestPayload,
        headers: { Authorization: `Bearer ${responseAuth.data.accessToken}` },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(201);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.addedProduct.name).toEqual('Obat Mata');
    });
  });
});
