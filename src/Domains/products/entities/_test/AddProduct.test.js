const AddProduct = require('../AddProduct');

describe('a AddProduct entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      name: 'nah',
      sku: 324343,
      image: 'ini image',
    };

    // Action and Assert
    expect(() => new AddProduct(payload)).toThrowError('ADD_PRODUCT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      name: [],
      sku: true,
      image: 'ini image',
      price: true,
      description: '',
      owner: [],
    };

    // Action and Assert
    expect(() => new AddProduct(payload)).toThrowError('ADD_PRODUCT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should throw error when name contains more than 100 character', () => {
    // Arrange

    const payload = {
      name: 'fljfaksjfkasfjlsfjsaldkfASFSAFSAFADSsajdflksafjlaksdfjlaskfjlsakdfjsaldkfjsdajfsalkfjlsafjsalkdjfsadlkfjsfasfsfdsadaldfjsaldkfjasdlkfj',
      sku: 8778686,
      image: 'ini image',
      price: true,
      description: 'test',
      owner: 'albert',
    };

    // Action and Assert
    expect(() => new AddProduct(payload)).toThrowError('ADD_PRODUCT.NAME_LIMIT_CHAR');
  });

  it('should create addProduct object correctly', () => {
    // Arrange
    const payload = {
      name: 'Obat Mata',
      sku: 8778686,
      image: 'ini image',
      price: 199,
      description: '',
      owner: 'albert',
    };
    // Action
    const {
      name, sku, image, price, description, owner,
    } = new AddProduct(payload);

    // Assert
    expect(name).toEqual(payload.name);
    expect(sku).toEqual(payload.sku);
    expect(image).toEqual(payload.image);
    expect(price).toEqual(payload.price);
    expect(description).toEqual(payload.description);
    expect(owner).toEqual(payload.owner);
  });
});
