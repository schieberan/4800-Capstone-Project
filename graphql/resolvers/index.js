const authResolver = require('./auth');
const maresResolver = require('./mares');
const logResolver = require('./logs');

const rootResolver = {
  ...authResolver,
  ...maresResolver,
  ...logResolver
};

module.exports = rootResolver;
