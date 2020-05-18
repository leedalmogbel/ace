
module.exports = {
  name: 'DanceModel',
  datasource: 'tennis-trainer-db',
  definition: function(datasource, DataTypes) {
    const DanceModel = datasource.define('DanceModel', {
      id : {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      }, 
      videoId : {
        type: DataTypes.INTEGER
      }, scenarioId : {
        type: DataTypes.INTEGER
      }
    }, {
      tableName: 'dance',
      timestamps: true
    });

    return DanceModel;
  }
};
      