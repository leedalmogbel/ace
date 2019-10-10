
module.exports = {
  name: 'PlayerModel',
  datasource: 'tennis-trainer-db',
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
    };

    return PlayerModel;
  }
};
  