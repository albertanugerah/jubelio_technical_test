class AddProduct {
  constructor(payload) {
    this._verifyPayload(payload);

    const {
      name, SKU: sku, image, price, description,
    } = payload;

    this.name = name;
    this.SKU = sku;
    this.image = image;
    this.price = price;
    this.description = description;
  }

  _verifyPayload({
    name, SKU: sku, image, price, description,
  }) {
    if (!name || !sku || !image || !price) {
      throw new Error('ADD_PRODUCT.NOT_CONTAIN_NEEDED_PROPERTY');
    }
    if (name.length > 100) {
      throw new Error('ADD_PRODUCT.NAME_LIMIT_CHAR');
    }

    if (typeof name !== 'string' || typeof sku !== 'number' || typeof image !== 'string' || typeof price !== 'number' || typeof description !== 'string' || typeof description === 'undefined') {
      throw new Error('ADD_PRODUCT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = AddProduct;
