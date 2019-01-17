describe('Joi Input Validation Schmema Tests', () => {
  test('new user schema should be present', () => {
    const { new_user, } = require('../schemas/joiInVal');
    expect(new_user).toBeDefined();
  });
});