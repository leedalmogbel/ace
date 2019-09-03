
module.exports = {
  name: 'postgresqldb',
  connector : 'sql',
  config: {
    host: '127.0.0.1',
    username: 'postgres',
    password: 'stratpoint',
    database: 'tennis',
    dialect: 'postgres',
    isSync: 'true',

  }
};
