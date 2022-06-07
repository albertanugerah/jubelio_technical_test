const InvariantError = require('../../Commons/exceptions/InvariantError');
const AddedProduct = require('../../Domains/products/entities/AddedProduct');
const ProductRepository = require('../../Domains/products/ProductRepository');

class ProductRepositoryPostgres extends ProductRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async verifyAvailableSKU(SKU) {
    const query = {
      text: 'SELECT SKU FROM products WHERE SKU = $1',
      values: [SKU],
    };

    const result = await this._pool.query(query);

    if (result.rowCount) {
      throw new InvariantError('SKU tidak tersedia');
    }
  }

  async AddProduct(storeProduct) {
    const {
      name, SKU, image, price, description,
    } = storeProduct;
    const id = this._idGenerator();

    const query = {
      text: 'INSERT INTO products VALUES($1, $2, $3, $4,$5,$6) RETURNING id, name, SKU, image,price,description',
      values: [id, name, SKU, image, price, description],
    };

    const result = await this._pool.query(query);

    return new AddedProduct({ ...result.rows[0] });
  }
}

module.exports = ProductRepositoryPostgres;
