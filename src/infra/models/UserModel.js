
module.exports = {
  name: 'UserModel',
  datasource: 'postgresqldb',
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
      }, isAdmin : {
        type: DataTypes.BOOLEAN,
        defaultValue: 'f'
      }, googleUserId : {
        type: DataTypes.INTEGER,
        unique: true
      },
    }, {
      tableName: 'users',
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
  