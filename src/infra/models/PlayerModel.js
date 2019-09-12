
module.exports = {
  name: 'PlayerModel',
  datasource: 'postgresqldb',
  definition: function(datasource, DataTypes) {
    const PlayerModel = datasource.define('PlayerModel', {
      id : {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      }, 
      userId : {
        type: DataTypes.INTEGER
      }, coachId : {
        type: DataTypes.INTEGER
      }, gender : {
        type: DataTypes.STRING
      }, height : {
        type: DataTypes.INTEGER
      }, weight : {
        type: DataTypes.INTEGER
      }, dominantHand : {
        type: DataTypes.STRING
      }, matchCounter : {
        type: DataTypes.INTEGER
      }, practiceCounter : {
        type: DataTypes.INTEGER
      }
    }, {
      tableName: 'players',
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

    PlayerModel.associate = () => {
      PlayerModel.belongsTo(datasource.models.UserModel, {
        foreignKey: 'userId',
        as: 'user'
      });
      PlayerModel.belongsTo(datasource.models.CoachesModel, {
        foreignKey: 'coachId',
        as: 'coach'
      });
      PlayerModel.hasMany(datasource.models.TypeMatchModel, {
        foreignKey: 'playerId'
      });
      PlayerModel.hasMany(datasource.models.TypePracticeModel, {
        foreignKey: 'playerId'
      });
    };

    return PlayerModel;
  }
};
  