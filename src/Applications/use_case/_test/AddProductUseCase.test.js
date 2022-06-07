const AddProduct = require('../../../Domains/products/entities/AddProduct');
const AddedProduct = require('../../../Domains/products/entities/AddedProduct');
const ProductRepository = require('../../../Domains/products/ProductRepository');
const AddProductUseCase = require('../AddProductUseCase');

describe('AddProductUseCase', () => {
  it('should orchestrating the add product action correctly', async () => {
    // Arrange
    const useCasePayload = {
      name: 'Palugaada',
      SKU: 23123233,
      image: 'ini_image.jpg',
      price: 100000,
      description: 'description',
    };
    const expectedAddedProduct = new AddedProduct({
      id: 123,
      name: useCasePayload.name,
      SKU: 2345,
      image: useCasePayload.image,
      price: useCasePayload.price,
      description: useCasePayload.description,
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
    expect(mockProductRepository.verifyAvailableSKU).toBeCalledWith(useCasePayload.SKU);
    expect(mockProductRepository.addProduct).toBeCalledWith(new AddProduct({
      id: 123,
      name: useCasePayload.name,
      SKU: 23123233,
      image: useCasePayload.image,
      price: useCasePayload.price,
      description: useCasePayload.description,
    }));
  });
});
