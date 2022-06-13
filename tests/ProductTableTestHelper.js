/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const ProductsTableTestHelper = {
  async addProduct({
    id = 'product-123',
    name = 'ini produk',
    sku = 123,
    image = 'ini_image.jpg',
    price = 1000,
    description = 'description',
    owner = 'albert',
  }) {
    const query = {
      text: 'INSERT INTO products VALUES($1, $2, $3, $4,$5,$6,$7)',
      values: [id, name, sku, image, price, description, owner],
    };

    await pool.query(query);
  },

  async findProductsById(id) {
    const query = {
      text: 'SELECT * FROM products WHERE id = $1',
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async cleanTable() {
    await pool.query('DELETE FROM products WHERE 1=1');
  },
};

module.exports = ProductsTableTestHelper;
