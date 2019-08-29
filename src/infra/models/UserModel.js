
module.exports = {
  name: 'UserModel',
  datasource: 'tennis-trainerdb',
  definition: function(datasource, DataTypes) {
    return datasource.define('users', {
      id : {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      }, 
      firstName : {
        type: DataTypes.STRING
      },lastName : {
        type: DataTypes.STRING
      },email : {
        type: DataTypes.STRING
      },is_admin : {
        type: DataTypes.BOOLEAN
      },
    }, {
      tableName: 'users',
      timestamps: true,
      classMethods: {
        associate() {
          // associations can be defined here
        }
      }
    });
  }
};
  