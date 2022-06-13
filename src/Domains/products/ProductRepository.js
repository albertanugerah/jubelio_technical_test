class ProductRepository {
  // eslint-disable-next-line class-methods-use-this
  async addProduct(storeProduct) {
    throw new Error('PRODUCT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  // eslint-disable-next-line class-methods-use-this
  async verifyAvailableSKU(sku) {
    throw new Error('PRODUCT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = ProductRepository;
