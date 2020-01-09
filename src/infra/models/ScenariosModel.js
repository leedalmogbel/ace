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
      scenario : {
        type: DataTypes.STRING,
        allowNull: false
      }, shotType : {
        type: DataTypes.STRING,
        allowNull: false
      }, movement : {
        type: DataTypes.STRING,
        allowNull: true
      }
    }, {
      tableName: 'scenarios',
      timestamps: true,
      indexes: [{
        unique: true,
        fields: ['shotType', 'movement']
      }]
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
    };
    
    return ScenariosModel;
  }
};
      