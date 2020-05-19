module.exports = {
  name: 'PersonKeypointModel',
  datasource: 'tennis-trainer-db',
  definition: function(datasource, DataTypes) {
    const PersonKeypointModel = datasource.define('PersonKeypointModel', {
      id : {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      }, 
      scenarioId : {
        type: DataTypes.INTEGER,
        allowNull: true
      }, clipPersonId : {
        type: DataTypes.INTEGER,
        allowNull: false
      }, userId : {
        type: DataTypes.INTEGER,
        allowNull: false
      }, keypointLink : {
        type: DataTypes.STRING,
        allowNull: true
      }, skeletonLink : {
        type: DataTypes.STRING,
        allowNull: true
      }, status : {
        type: DataTypes.ENUM('init', 'failed', 'successKeypoint', 'successSkeleton'),
        defaultValue: 'init'
      }
    }, {
      tableName: 'personKeypoints',
      timestamps: true
    });
      
         
    PersonKeypointModel.associate = () => {
      PersonKeypointModel.hasMany(datasource.models.ScoreModel, {
        foreignKey: 'clipPersonId',
        as: 'score'
      });
    };
      
    return PersonKeypointModel;
  }
};
        