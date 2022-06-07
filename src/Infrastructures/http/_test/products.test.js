const pool = require('../../database/postgres/pool');
const ProductTableTestHelper = require('../../../../tests/ProductTableTestHelper');
const container = require('../../container');
const createServer = require('../createServer');

describe('/products endpoint', () => {
  afterAll(async () => {
    await pool.end();
  });

  afterEach(async () => {
    await ProductTableTestHelper.cleanTable();
  });

  describe('when POST /products', () => {
    it('should response 201 and persisted user', async () => {
      // Arrange
      const requestPayload = {
        name: 'ini produk',
        SKU: 123,
        image: 'ini_image.jpg',
        price: 1000,
        description: 'ini description',
      };
      // eslint-disable-next-line no-undef
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/products',
        payload: requestPayload,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(201);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.addedUser).toBeDefined();
    });

    it('should response 400 when request payload not contain needed property', async () => {
      // Arrange
      const requestPayload = {
        image: 'ini_image.jpg',
        price: 1000,
      };
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/products',
        payload: requestPayload,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('tidak dapat membuat produk baru karena properti yang dibutuhkan tidak ada');
    });

    it('should response 400 when request payload not meet data type specification', async () => {
      // Arrange
      const requestPayload = {
        name: 'dicoding',
        SKU: 123,
        image: 'ini_image.jpg',
        price: true,
        description: ['ini description'],
      };
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/products',
        payload: requestPayload,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('tidak dapat membuat produk baru karena tipe data tidak sesuai');
    });

    it('should response 400 when name more than 100 character', async () => {
      // Arrange
      const requestPayload = {
        name: 'afdsafdsafdsasdfdsafdsafsfsadfsafdsfdsafadsaffdsdsafafdsadffdssdfdsafdsfdsafdsafdfasdfdsadsfdsffdsadfsdsffds',
        SKU: 123,
        image: 'ini_image.jpg',
        price: 1000,
        description: 'ini description',
      };
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/products',
        payload: requestPayload,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('tidak dapat membuat produk baru karena karakter name melebihi batas limit');
    });

    it('should response 400 when sku unavailable', async () => {
      // Arrange
      await ProductTableTestHelper.addProduct({ SKU: 123 });
      const requestPayload = {
        name: 'ini produk',
        SKU: 123,
        image: 'ini_image.jpg',
        price: 1000,
        description: 'ini description',
      };
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/products',
        payload: requestPayload,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('SKU tidak tersedia');
    });
  });
});
