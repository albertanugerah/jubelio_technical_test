const AddedProduct = require('../AddedProduct');

describe('a AddedProduct entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      name: 'obat kumur',
      sku: 100,
    };

    // Action and Assert
    expect(() => new AddedProduct(payload)).toThrowError('ADDED_PRODUCT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      id: '123',
      name: [],
      sku: 100,
      image: 'ini image',
      price: true,
      description: 'test',
      owner: 'ini owner',
    };

    // Action and Assert
    expect(() => new AddedProduct(payload)).toThrowError('ADDED_PRODUCT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create AddedProduct object correctly', () => {
    // Arrange
    const payload = {
      id: '122',
      name: 'ini nama',
      sku: 100,
      image: 'ini image',
      price: 200,
      description: 'tst',
      owner: 'albert',
    };

    // Action
    const addedProduct = new AddedProduct(payload);

    // Assert
    expect(addedProduct.id).toEqual(payload.id);
    expect(addedProduct.name).toEqual(payload.name);
    expect(addedProduct.sku).toEqual(payload.sku);
    expect(addedProduct.image).toEqual(payload.image);
    expect(addedProduct.price).toEqual(payload.price);
    expect(addedProduct.description).toEqual(payload.description);
    expect(addedProduct.owner).toEqual(payload.owner);
  });
});
