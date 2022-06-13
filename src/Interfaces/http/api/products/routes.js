const routes = (handler) => ([
  {
    method: 'POST',
    path: '/products',
    handler: handler.postProductHandler,
    options: {
      auth: 'product_api_jwt',
    },
  },
]);

module.exports = routes;
