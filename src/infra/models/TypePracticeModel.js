
module.exports = {
  name: 'TypePracticeModel',
  // datasource: 'postgresqldb',
  datasource: 'tennis-trainer-db',
  definition: function(datasource, DataTypes) {
    const TypePracticeModel = datasource.define('TypePracticeModel', {
      id : {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      }, 
      tagId : {
        type: DataTypes.INTEGER
      }, playerId : {
        type: DataTypes.INTEGER
      },
    }, {
      tableName: 'typePractice',
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

    TypePracticeModel.associate = () => {
      TypePracticeModel.belongsTo(datasource.models.VideoModel, {
        foreignKey: 'videoId',
        as: 'tag'
      });
      TypePracticeModel.belongsTo(datasource.models.PlayerModel, {
        foreignKey: 'playerId',
        as: 'player'
      });
    };

    return TypePracticeModel;
  }
};
  