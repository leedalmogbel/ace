
module.exports = {
  name: 'TennisModel',
  datasource: 'tennis-trainer-db',
  definition: function(datasource, DataTypes) {
    const TennisModel = datasource.define('TennisModel', {
      id : {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      }, 
      videoId : {
        type: DataTypes.INTEGER
      }, tournament : {
        type: DataTypes.STRING
      }, gameType : {
        type: DataTypes.STRING
      }, setType : {
        type: DataTypes.STRING
      },
    }, {
      tableName: 'tennis',
      timestamps: true
    });
  
  
    return TennisModel;
  }
};
    