/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('products', {
    id: {
      type: 'integer',
      primaryKey: true,
    },
    name: {
      type: 'varchar(100)',
      notNull: true,
    },
    SKU: {
      type: 'integer',
      notNull: true,
      unique: true,
    },
    image: {
      type: 'text',
      notNull: true,
    },
    price: {
      type: 'integer',
      notNull: true,
    },
    description: {
      type: 'text',
      notNull: false,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('products');
};
