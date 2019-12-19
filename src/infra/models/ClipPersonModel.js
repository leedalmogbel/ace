module.exports = {
  name: 'ClipPersonModel',
  datasource: 'tennis-trainer-db',
  definition: function(datasource, DataTypes) {
    const ClipPersonModel = datasource.define('ClipPersonModel', {
      id : {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      }, 
      clipId : {
        type: DataTypes.INTEGER,
        allowNull: false
      }, image : {
        type: DataTypes.TEXT,
        allowNull: false
      }, centroid : {
        type: DataTypes.STRING,
        allowNull: false
      }, modelLink : {
        type: DataTypes.STRING,
        allowNull: true
      }, keyPointLink : {
        type: DataTypes.STRING,
        allowNull: true
      }, skeletonLink : {
        type: DataTypes.STRING,
        allowNull: true
      }
    }, {
      tableName: 'clipPersons',
      timestamps: true
    });
  
    ClipPersonModel.associate = () => {
      ClipPersonModel.belongsTo(datasource.models.ClipModel, {
        foreignKey: 'clipId',
        as: 'clip'
      });
      ClipPersonModel.hasMany(datasource.models.ScoreModel, {
        foreignKey: 'testId',
        as: 'testScores'
      });
    };
  
    return ClipPersonModel;
  }
};
    