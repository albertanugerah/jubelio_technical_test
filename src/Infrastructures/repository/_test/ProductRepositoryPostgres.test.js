const ProductsTableTestHelper = require('../../../../tests/ProductTableTestHelper');
const InvariantError = require('../../../Commons/exceptions/InvariantError');
const AddProduct = require('../../../Domains/products/entities/AddProduct');
const AddedProduct = require('../../../Domains/products/entities/AddedProduct');
const pool = require('../../database/postgres/pool');
const ProductRepositoryPostgres = require('../ProductRepositoryPostgres');

describe('ProductRepositoryPostgres', () => {
  afterEach(async () => {
    await ProductsTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('verifyAvailableSKU function', () => {
    it('should throw InvariantError when SKU not available', async () => {
      // Arrange
      await ProductsTableTestHelper.addProduct({ '"SKU"': 123 });
      const userRepositoryPostgres = new ProductRepositoryPostgres(pool, {});

      // Action & Assert
      await expect(userRepositoryPostgres.verifyAvailableSKU(123))
        .rejects.toThrowError(InvariantError);
    });

    it('should not throw InvariantError when SKU available', async () => {
      // Arrange
      const userRepositoryPostgres = new ProductRepositoryPostgres(pool, {});

      // Action & Assert
      await expect(userRepositoryPostgres.verifyAvailableSKU(123))
        .resolves.not.toThrowError(InvariantError);
    });
  });

  describe('addProduct function', () => {
    it('should persist add product', async () => {
      // Arrange
      const addProduct = new AddProduct({
        name: 'ini product',
        '"SKU"': 12345,
        image: 'image.jpg',
        price: 10000,
        description: 'ini description',
      });
      const fakeIdGenerator = () => 123; // stub!
      const userRepositoryPostgres = new ProductRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      await userRepositoryPostgres.addProduct(addProduct);

      // Assert
      const users = await ProductsTableTestHelper.findProductsById(123);
      expect(users).toHaveLength(1);
    });

    it('should return added product correctly', async () => {
      // Arrange
      const addProduct = new AddProduct({
        name: 'ini product',
        '"SKU"': 12345,
        image: 'image.jpg',
        price: 10000,
        description: 'ini description',
      });
      const fakeIdGenerator = () => '123'; // stub!
      const userRepositoryPostgres = new ProductRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      const addedProduct = await userRepositoryPostgres.addProduct(addProduct);

      // Assert
      expect(addedProduct).toStrictEqual(new AddedProduct({
        id: 123,
        name: 'ini product',
        SKU: 12345,
        image: 'image.jpg',
        price: 10000,
        description: 'ini description',
      }));
    });
  });
});
