

module.exports = function (router) {
  require('./categories')(router);
  require('./posts')(router);
  require('./users')(router);

  return router;
};

