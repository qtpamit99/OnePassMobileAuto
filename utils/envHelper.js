const argv = require('minimist')(process.argv.slice(2));

function getEnvConfig() {
  const config = require('../config/config.json');
  const env = argv.env || config.defaultEnv;
  const envConfig = config.environments[env];

  if (!envConfig) {
    throw new Error(`Environment "${env}" not found in config.json`);
  }

  return envConfig;
}

module.exports = { getEnvConfig };