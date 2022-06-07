const AddedProduct = require('../AddedProduct');

describe('a AddedProduct entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      name: 'obat kumur',
      SKU: 100,
    };

    // Action and Assert
    expect(() => new AddedProduct(payload)).toThrowError('ADDED_PRODUCT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      id: '123',
      name: 'buah pisang',
      SKU: 100,
      image: 'ini image',
      price: '200',
      description: '',
    };

    // Action and Assert
    expect(() => new AddedProduct(payload)).toThrowError('ADDED_PRODUCT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create AddedProduct object correctly', () => {
    // Arrange
    const payload = {
      id: 122,
      name: 'ini nama',
      SKU: 100,
      image: 'ini image',
      price: 200,
      description: '',
    };

    // Action
    const addedProduct = new AddedProduct(payload);

    // Assert
    expect(addedProduct.id).toEqual(payload.id);
    expect(addedProduct.name).toEqual(payload.name);
    expect(addedProduct.SKU).toEqual(payload.SKU);
    expect(addedProduct.image).toEqual(payload.image);
    expect(addedProduct.price).toEqual(payload.price);
    expect(addedProduct.description).toEqual(payload.description);
  });
});
