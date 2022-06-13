/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('products', {
    id: {
      type: 'varchar(50)',
      primaryKey: true,
    },
    name: {
      type: 'varchar(100)',
      notNull: true,
    },
    sku: {
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
      default: null,
    },
    owner: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
  });

  pgm.addConstraint('products', 'fk_products.owner_users.id', 'FOREIGN KEY(owner) REFERENCES users(id) ON DELETE CASCADE');
};

exports.down = (pgm) => {
  pgm.dropTable('products');
};
