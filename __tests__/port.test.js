describe('port stuff', () => {
  const oldEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...oldEnv, };
    delete process.env.BACKEND_HTTP_PORT;
    delete process.env.BACKEND_HTTPS_PORT;
  });

  afterEach(() => {
    process.env = oldEnv;
  });

  test('should return fallback without env', () => {
    const testedModule = require('../common/port');
    expect(testedModule.httpPort).toBeDefined();
    expect(testedModule.httpsPort).toBeDefined();
    expect(testedModule.httpPort).toBe('8080');
    expect(testedModule.httpsPort).toBe('8443');
  });

  test('should return ports from env', () => {
    process.env.BACKEND_HTTP_PORT = '6666';
    process.env.BACKEND_HTTPS_PORT = '7777';
    const testedModule = require('../common/port');
    expect(testedModule.httpPort).toBeDefined();
    expect(testedModule.httpsPort).toBeDefined();
    expect(testedModule.httpPort).toBe('6666');
    expect(testedModule.httpsPort).toBe('7777');
  });
});