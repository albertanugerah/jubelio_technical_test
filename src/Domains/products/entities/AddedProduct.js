class AddedProduct {
  constructor(payload) {
    this._verifyPayload(payload);

    const {
      id, name, sku, image, price, description, owner,
    } = payload;

    this.id = id;
    this.name = name;
    this.sku = sku;
    this.image = image;
    this.price = price;
    this.description = description;
    this.owner = owner;
  }

  // eslint-disable-next-line class-methods-use-this
  _verifyPayload({
    id, name, sku, image, price, description, owner,
  }) {
    if (!id || !name || !sku || !image || !price || !owner) {
      throw new Error('ADDED_PRODUCT.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof id !== 'string' || typeof name !== 'string' || typeof sku !== 'number' || typeof image !== 'string' || typeof price !== 'number' || typeof description !== 'string' || typeof owner !== 'string') {
      throw new Error('ADDED_PRODUCT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = AddedProduct;
