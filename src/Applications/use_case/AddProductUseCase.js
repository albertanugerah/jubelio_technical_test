const AddProduct = require('../../Domains/products/entities/AddProduct');

class AddProductUseCase {
  constructor({ productRepository }) {
    this._productRepository = productRepository;
  }

  async execute(useCasePayload) {
    const addProduct = new AddProduct(useCasePayload);
    await this._productRepository.verifyAvailableSKU(addProduct.sku);
    return this._productRepository.addProduct(addProduct);
  }
}

module.exports = AddProductUseCase;
