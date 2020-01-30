
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
        unique: true
      }, userType : {
        type: DataTypes.ENUM('player', 'coach', 'admin'),
        defaultValue: 'player'
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
      timestamps: true
    });

    UserModel.associate = () => {
      UserModel.hasMany(datasource.models.CoachesModel, {
        foreignKey: 'userId'
      });
      UserModel.hasMany(datasource.models.PlayerModel, {
        foreignKey: 'userId'
      });
      UserModel.hasMany(datasource.models.VideoModel, {
        foreignKey: 'userId'
      });
    };

    return UserModel;
  }
};
  