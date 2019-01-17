const fallbackPortHttp = '8080';
const fallbackPortHttps = '8443';
const httpPort = process.env.BACKEND_HTTP_PORT || fallbackPortHttp;
const httpsPort = process.env.BACKEND_HTTPS_PORT || fallbackPortHttps;

module.exports = {
  httpPort: httpPort,
  httpsPort: httpsPort,
};