
module.exports = {
  name: 'TestModel',
  // datasource: 'postgresqldb',
  datasource: 'tennis-trainer-db',
  definition: function(datasource, DataTypes) {
    const TestModel = datasource.define('TestModel', {
      id : {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      }, 
      testCol : {
        type: DataTypes.STRING,
        unique: true
      },
    }, {
      tableName: 'tests',
      timestamps: true
    });

    /**
     * Examples on how to associate or set relationship with other models
     * 
     *  UserModel.associate = function () {
     *   UserModel.belongsTo(datasource.models.GroupModel, {
     *     foreignKey: 'groupId',
     *     as: 'group',
     *   });
     *  };
     * 
     * refer to sequelize documentation https://sequelize.org/master/manual/associations.html
     */

    return TestModel;
  }
};
  