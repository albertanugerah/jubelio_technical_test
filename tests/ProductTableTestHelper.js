/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const ProductsTableTestHelper = {
  async addProduct({
    id = 12321,
    name = 'ini produk',
    sku = 23123233,
    image = 'ini_image.jpg',
    price = 100000,
    description = 'description',
  }) {
    const query = {
      text: 'INSERT INTO products VALUES($1, $2, $3, $4,$5,$6)',
      values: [id, name, sku, image, price, description],
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
