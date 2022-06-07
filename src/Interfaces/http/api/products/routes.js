const routes = (handler) => ([
  {
    method: 'POST',
    path: '/products',
    handler: handler.postProductHandler,
  },
]);

module.exports = routes;
