const AddProduct = require('../../../Domains/products/entities/AddProduct');
const AddedProduct = require('../../../Domains/products/entities/AddedProduct');
const ProductRepository = require('../../../Domains/products/ProductRepository');
const AddProductUseCase = require('../AddProductUseCase');

describe('AddProductUseCase', () => {
  it('should orchestrating the add product action correctly', async () => {
    // Arrange
    const useCasePayload = {
      name: 'Palugaada',
      sku: 1234,
      image: 'ini_image.jpg',
      price: 100000,
      description: 'description',
      owner: 'albert',
    };
    const expectedAddedProduct = new AddedProduct({
      id: 'product-123',
      name: useCasePayload.name,
      sku: useCasePayload.sku,
      image: useCasePayload.image,
      price: useCasePayload.price,
      description: useCasePayload.description,
      owner: useCasePayload.owner,
    });

    /** creating dependency of use case */
    const mockProductRepository = new ProductRepository();

    /** mocking needed function */
    mockProductRepository.verifyAvailableSKU = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockProductRepository.addProduct = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedAddedProduct));

    /** creating use case instance */
    const getProductUseCase = new AddProductUseCase({
      productRepository: mockProductRepository,
    });

    // Action
    const addedProduct = await getProductUseCase.execute(useCasePayload);

    // Assert
    expect(addedProduct).toStrictEqual(expectedAddedProduct);
    expect(mockProductRepository.verifyAvailableSKU).toBeCalledWith(useCasePayload.sku);
    expect(mockProductRepository.addProduct).toBeCalledWith(new AddProduct({
      name: useCasePayload.name,
      sku: useCasePayload.sku,
      image: useCasePayload.image,
      price: useCasePayload.price,
      description: useCasePayload.description,
      owner: useCasePayload.owner,
    }));
  });
});
