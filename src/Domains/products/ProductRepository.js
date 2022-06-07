class ProductRepository {
  async addProduct(storeProduct) {
    throw new Error('PRODUCT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async verifyAvailableSKU(SKU) {
    throw new Error('PRODUCT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = ProductRepository;
