const ProductRepository = require('../ProductRepository');

describe('ProductRepository interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    // Arrange
    const productRepository = new ProductRepository();

    // Action and Assert
    await expect(productRepository.addProduct({})).rejects.toThrowError('PRODUCT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(productRepository.verifyAvailableSKU('')).rejects.toThrowError('PRODUCT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  });
});
