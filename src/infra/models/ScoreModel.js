
module.exports = {
  name: 'ScoreModel',
  datasource: 'tennis-trainer-db',
  definition: function(datasource, DataTypes) {
    const ScoreModel = datasource.define('ScoreModel', {
      id : {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      }, 
      clipId : {
        type: DataTypes.INTEGER,
        allowNull: false
      }, clipPersonId : {
        type: DataTypes.INTEGER,
        allowNull: false
      }, score : {
        type: DataTypes.STRING,
        allowNull: false
      }, keypointMap : {
        type: DataTypes.STRING,
        defaultValue: 'all'
      }, scenarioId : {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    }, {
      tableName: 'scores',
      timestamps: true
    });
  

  
    return ScoreModel;
  }
};
    