
const config = {
  local: {
    name: 'tennis-trainer-db',
    connector : 'sql',
    config: {
      host: '127.0.0.1',
      username: 'postgres',
      password: 'stratpoint',
      database: 'tennis',
      dialect: 'postgres',
      isSync: 'true',
      logging: false,
      pool: {
        max: 50,
        min: 0,
        idle: 10
      }
    }
  },

  dev: {
    name: 'tennis-trainer-db',
    connector: 'sql',
    config: {
      host: process.env.DB_HOST,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      dialect: process.env.DB_DIALECT,
      isSync: 'true',
      logging: false,
      pool: {
        max: 50,
        min: 0,
        idle: 10
      }
    }
  }
};

module.exports = process.env.NODE_ENV === 'dev' ? config.dev : config.local;