describe('testing db conf env things', () => {
  const orgEnv = process.env;

  beforeAll(() => {
    jest.resetModules();
    delete process.env.BACKEND_DB_HOST;
    delete process.env.BACKEND_DB_USER;
    delete process.env.BACKEND_DB_DATABASE;
    delete process.env.BACKEND_DB_PASSWORD;
  });

  afterAll(() => {
    process.env = orgEnv;
  });

  test('loading db conf via env and check if db stuff is set', () => {
    require('dotenv').config();
    const { host, user, database, password, } = require('../db/db_conf');
    expect(host).toBeDefined;
    expect(user).toBeDefined;
    expect(database).toBeDefined;
    expect(password).toBeDefined;
  });
});