const ProductsTableTestHelper = require('../../../../tests/ProductTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const InvariantError = require('../../../Commons/exceptions/InvariantError');
const AddProduct = require('../../../Domains/products/entities/AddProduct');
const AddedProduct = require('../../../Domains/products/entities/AddedProduct');
const pool = require('../../database/postgres/pool');
const ProductRepositoryPostgres = require('../ProductRepositoryPostgres');
const ProductRepository = require('../../../Domains/products/ProductRepository');

describe('ProductRepositoryPostgres', () => {
  afterEach(async () => {
    await ProductsTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });
  it('should be instance of ThreadRepository domain', () => {
    const productRepositoryPostgres = new ProductRepositoryPostgres({}, {}); // Dummy dependency

    expect(productRepositoryPostgres).toBeInstanceOf(ProductRepository);
  });

  describe('addProduct function', () => {
    it('should persist add product  and return added product correctly', async () => {
      await UsersTableTestHelper.addUser({ id: 'user-123456', username: 'albert' });
      // Arrange
      const storeProduct = new AddProduct({
        name: 'ini product',
        sku: 123,
        image: 'image',
        price: 100,
        description: 'gg',
        owner: 'user-123456',
      });
      const fakeIdGenerator = () => '123'; // stub!
      const productRepositoryPostgres = new ProductRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      const addedProduct = await productRepositoryPostgres.addProduct(storeProduct);

      // Assert
      const product = await ProductsTableTestHelper.findProductsById('product-123');

      expect(addedProduct).toStrictEqual(new AddedProduct({
        id: 'product-123',
        name: storeProduct.name,
        sku: storeProduct.sku,
        image: storeProduct.image,
        price: storeProduct.price,
        description: storeProduct.description,
        owner: 'user-123456',
      }));
      expect(product).toHaveLength(1);
    });
  });
  describe('verifyAvailableSKU function', () => {
    it('should throw InvariantError when sku available', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({ id: 'user-123456', username: 'albert' });
      await ProductsTableTestHelper.addProduct({ sku: 123, owner: 'user-123456' });
      const productRepositoryPostgres = new ProductRepositoryPostgres(pool, {});

      // Action & Assert
      await expect(productRepositoryPostgres.verifyAvailableSKU(123))
        .rejects.toThrowError(InvariantError);
    });

    it('should not throw InvariantError when SKU not available', async () => {
      // Arrange
      const productRepositoryPostgres = new ProductRepositoryPostgres(pool, {});

      // Action & Assert
      await expect(productRepositoryPostgres.verifyAvailableSKU(123))
        .resolves.not.toThrowError(InvariantError);
    });
  });
});
