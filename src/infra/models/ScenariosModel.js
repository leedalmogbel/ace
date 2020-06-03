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
        defaultValue: ''
      }, subActivityFour : {
        type: DataTypes.STRING,
        defaultValue: ''
      }, subActivityFive : {
        type: DataTypes.STRING,
        defaultValue: ''
      }, subActivitySix : {
        type: DataTypes.STRING,
        defaultValue: ''
      }, subActivitySeven : {
        type: DataTypes.STRING,
        defaultValue: ''
      }, subActivityEight : {
        type: DataTypes.STRING,
        defaultValue: ''
      }, subActivityNine : {
        type: DataTypes.STRING,
        defaultValue: ''
      }, subActivityTen : {
        type: DataTypes.STRING,
        defaultValue: ''
      }, createdBy : {
        type: DataTypes.INTEGER
      }, updatedBy : {
        type: DataTypes.INTEGER
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
        as: 'keypoint'
      });
      ScenariosModel.hasMany(datasource.models.ScoreModel, {
        foreignKey: 'scenarioId',
        as: 'score'
      });
      ScenariosModel.hasMany(datasource.models.DanceModel, {
        foreignKey: 'scenarioId',
        as: 'dance'
      });
    };
    
    return ScenariosModel;
  }
};
      