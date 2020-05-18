
module.exports = {
  name: 'UserModel',
  datasource: 'tennis-trainer-db',
  definition: function(datasource, DataTypes) {
    const UserModel = datasource.define('UserModel', {
      id : {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      }, name : {
        type: DataTypes.STRING
      }, email : {
        type: DataTypes.STRING,
      }, userType : {
        type: DataTypes.ENUM('user', 'coach', 'admin', 'root'),
        defaultValue: 'user'
      }, googleUserId : {
        type: DataTypes.STRING,
      }, fbUserId : {
        type: DataTypes.STRING,
      }, subscribed : {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
    }, {
      tableName: 'users',
      timestamps: true,
      indexes: [{
        unique: true,
        fields: ['email']
      }]
    });

    UserModel.associate = () => {
      UserModel.hasMany(datasource.models.VideoModel, {
        foreignKey: 'userId',
        as : 'videos'
      });
    };

    return UserModel;
  }
};
  