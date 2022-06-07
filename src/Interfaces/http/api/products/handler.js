const AddProductUseCase = require('../../../../Applications/use_case/AddProductUseCase');

class ProductsHandler {
  constructor(container) {
    this._container = container;

    this.postProductHandler = this.postProductHandler.bind(this);
  }

  async postProductHandler(request, h) {
    const addProductUseCase = this._container.getInstance(AddProductUseCase.name);
    const addedProduct = await addProductUseCase.execute(request.payload);

    const response = h.response({
      status: 'success',
      data: {
        addedProduct,
      },
    });
    response.code(201);
    return response;
  }
}

module.exports = ProductsHandler;
