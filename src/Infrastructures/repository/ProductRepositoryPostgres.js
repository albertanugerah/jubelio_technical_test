const InvariantError = require('../../Commons/exceptions/InvariantError');
const AddedProduct = require('../../Domains/products/entities/AddedProduct');
const ProductRepository = require('../../Domains/products/ProductRepository');

class ProductRepositoryPostgres extends ProductRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async verifyAvailableSKU(sku) {
    const query = {
      text: 'SELECT sku FROM products WHERE sku = $1',
      values: [sku],
    };

    const result = await this._pool.query(query);

    if (result.rows.length >= 1) {
      throw new InvariantError('SKU sudah ada');
    }
  }

  async addProduct(storeProduct) {
    const {
      name, sku, image, price, description, owner,
    } = storeProduct;
    const id = `product-${this._idGenerator()}`;

    const query = {
      text: 'INSERT INTO products VALUES($1, $2, $3, $4,$5,$6,$7) RETURNING id, name, sku, image,price,description,owner',
      values: [id, name, sku, image, price, description, owner],
    };

    const result = await this._pool.query(query);

    return new AddedProduct({ ...result.rows[0] });
  }
}

module.exports = ProductRepositoryPostgres;
