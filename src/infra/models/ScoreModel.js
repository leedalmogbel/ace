
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
      }, standardId : {
        type: DataTypes.INTEGER,
        allowNull: false
      }, testId : {
        type: DataTypes.INTEGER,
        allowNull: false
      }, score : {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      tableName: 'scores',
      timestamps: true
    });
  
     
    ScoreModel.associate = () => {
      ScoreModel.belongsTo(datasource.models.ClipModel, {
        foreignKey: 'clipId',
        as: 'clip'
      });
      ScoreModel.belongsTo(datasource.models.ClipPersonModel, {
        foreignKey: 'standardId',
        as: 'standardClip'
      });
      ScoreModel.belongsTo(datasource.models.ClipPersonModel, {
        foreignKey: 'testId',
        as: 'testClip'
      });
    };
  
    return ScoreModel;
  }
};
    