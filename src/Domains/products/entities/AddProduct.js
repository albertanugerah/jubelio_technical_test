class AddProduct {
  constructor(payload) {
    this._verifyPayload(payload);

    const {
      name, sku, image, price, description = null, owner,
    } = payload;

    this.name = name;
    this.sku = sku;
    this.image = image;
    this.price = price;
    this.description = description;
    this.owner = owner;
  }

  _verifyPayload({
    name, sku, image, price, description, owner,
  }) {
    if (!name || !sku || !image || !price || !owner) {
      throw new Error('ADD_PRODUCT.NOT_CONTAIN_NEEDED_PROPERTY');
    }
    if (name.length > 100) {
      throw new Error('ADD_PRODUCT.NAME_LIMIT_CHAR');
    }

    if (typeof name !== 'string' || typeof sku !== 'number' || typeof image !== 'string' || typeof price !== 'number' || typeof description !== 'string' || typeof owner !== 'string') {
      throw new Error('ADD_PRODUCT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = AddProduct;
