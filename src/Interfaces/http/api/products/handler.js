const AddProductUseCase = require('../../../../Applications/use_case/AddProductUseCase');

class ProductsHandler {
  constructor(container) {
    this._container = container;

    this.postProductHandler = this.postProductHandler.bind(this);
  }

  async postProductHandler(request, h) {
    const addProductUseCase = this._container.getInstance(AddProductUseCase.name);
    const { id: owner } = request.auth.credentials;

    const useCasePayload = {
      name: request.payload.name,
      sku: request.payload.sku,
      image: request.payload.image,
      price: request.payload.price,
      description: request.payload.description,
      owner,
    };
    const addedProduct = await addProductUseCase.execute(useCasePayload);

    return h.response({
      status: 'success',
      data: {
        addedProduct,
      },
    }).code(201);
  }
}

module.exports = ProductsHandler;
