const config = require('../config/config.json');

class ConfigLoader {
  static getConfig() {
    // Get environment from command-line (e.g., --env=qa) or default to config.defaultEnv
    const env = process.env.ENV || config.defaultEnv;
    
    // Validate environment
    if (!config.environments[env]) {
      throw new Error(`Invalid environment: ${env}. Valid options: ${Object.keys(config.environments).join(', ')}`);
    }

    // Return environment-specific config
    return config.environments[env];
  }
}

module.exports = { ConfigLoader };