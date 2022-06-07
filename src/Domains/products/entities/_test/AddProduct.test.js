const AddProduct = require('../AddProduct');

describe('a AddProduct entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      name: 'nah',
      SKU: 324343,
      image: 'ini image',
    };

    // Action and Assert
    expect(() => new AddProduct(payload)).toThrowError('ADD_PRODUCT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      name: [],
      SKU: true,
      image: 'ini image',
      price: true,
      description: '',
    };

    // Action and Assert
    expect(() => new AddProduct(payload)).toThrowError('ADD_PRODUCT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should throw error when name contains more than 100 character', () => {
    // Arrange

    const payload = {
      name: 'fljfaksjfkasfjlsfjsaldkfASFSAFSAFADSsajdflksafjlaksdfjlaskfjlsakdfjsaldkfjsdajfsalkfjlsafjsalkdjfsadlkfjsfasfsfdsadaldfjsaldkfjasdlkfj',
      SKU: 8778686,
      image: 'ini image',
      price: true,
      description: '',
    };

    // Action and Assert
    expect(() => new AddProduct(payload)).toThrowError('ADD_PRODUCT.NAME_LIMIT_CHAR');
  });

  it('should create addProduct  object correctly', () => {
    // Arrange
    const payload = {
      name: 'Obat Mata',
      SKU: 8778686,
      image: 'ini image',
      price: 199,
      description: '',
    };
    // Action
    const {
      name, SKU, image, price, description,
    } = new AddProduct(payload);

    // Assert
    expect(name).toEqual(payload.name);
    expect(SKU).toEqual(payload.SKU);
    expect(image).toEqual(payload.image);
    expect(price).toEqual(payload.price);
    expect(description).toEqual(payload.description);
  });
});
