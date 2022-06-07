class AddedProduct {
  constructor(payload) {
    this._verifyPayload(payload);

    const {
      id, name, SKU, image, price, description,
    } = payload;

    this.id = id;
    this.name = name;
    this.SKU = SKU;
    this.image = image;
    this.price = price;
    this.description = description;
  }

  _verifyPayload({
    id, name, SKU, image, price, description,
  }) {
    if (!id || !name || !SKU || !image || !price) {
      throw new Error('ADDED_PRODUCT.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof id !== 'number' || typeof name !== 'string' || typeof SKU !== 'number' || typeof image !== 'string' || typeof price !== 'number' || typeof description !== 'string' || typeof description === 'undefined') {
      throw new Error('ADDED_PRODUCT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = AddedProduct;
