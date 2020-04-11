module.exports = {
  name: 'StandardModel',
  datasource: 'tennis-trainer-db',
  definition: function(datasource, DataTypes) {
    const StandardModel = datasource.define('StandardModel', {
      id : {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      }, 
      scenarioId : {
        type: DataTypes.INTEGER,
        allowNull: false
      }, userId : {
        type: DataTypes.INTEGER,
        allowNull: false
      }, modelLink : {
        type: DataTypes.STRING,
        allowNull: false
      }, keypointMap : {
        type: DataTypes.STRING,
        defaultValue: 'all'
      }, status : {
        type: DataTypes.STRING,
      }
    }, {
      tableName: 'standardModels',
      timestamps: true,
      indexes: [{
        unique: true,
        fields: ['scenarioId', 'userId', 'keypointMap']
      }]
    });
      
         
    StandardModel.associate = () => {
      StandardModel.belongsTo(datasource.models.ScenariosModel, {
        foreignKey: 'scenarioId',
        as: 'scenario'
      });
      StandardModel.belongsTo(datasource.models.UserModel, {
        foreignKey: 'userId',
        as: 'user'
      });
    };
      
    return StandardModel;
  }
};
        