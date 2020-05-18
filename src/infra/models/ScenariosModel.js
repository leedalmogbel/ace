module.exports = {
  name: 'ScenariosModel',
  datasource: 'tennis-trainer-db',
  definition: function(datasource, DataTypes) {
    const ScenariosModel = datasource.define('ScenariosModel', {
      id : {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      }, 
      activity : {
        type: DataTypes.STRING,
        allowNull: false,
      }, subActivityOne : {
        type: DataTypes.STRING,
        allowNull: false
      }, subActivityTwo : {
        type: DataTypes.STRING,
        allowNull: false
      }, subActivityThree : {
        type: DataTypes.STRING,
        allowNull: true,
      }, subActivityFour : {
        type: DataTypes.STRING,
        allowNull: true
      }, subActivityFive : {
        type: DataTypes.STRING,
        allowNull: true
      }
    }, {
      tableName: 'scenarios',
      timestamps: true,
      // indexes: [{
      //   unique: true,
      //   fields: ['activity', 'subActivityOne', 'subActivityTwo', 'subActivityThree', 'subActivityFour', 'subActivityFive']
      // }]
    });
    
       
    ScenariosModel.associate = () => {
      ScenariosModel.hasMany(datasource.models.StandardModel, {
        foreignKey: 'scenarioId',
        as: 'standardModel'
      });
      ScenariosModel.hasMany(datasource.models.PersonKeypointModel, {
        foreignKey: 'scenarioId',
        as: 'keypoints'
      });
      ScenariosModel.hasMany(datasource.models.ScoreModel, {
        foreignKey: 'scenarioId',
        as: 'scores'
      });
      ScenariosModel.hasMany(datasource.models.DanceModel, {
        foreignKey: 'scenarioId',
        as: 'dance'
      });
    };
    
    return ScenariosModel;
  }
};
      