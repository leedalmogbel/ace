
module.exports = {
  name: 'TypeMatchModel',
  datasource: 'tennis-trainer-db',
  definition: function(datasource, DataTypes) {
    const TypeMatchModel = datasource.define('TypeMatchModel', {
      id : {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      }, 
      tagId : {
        type: DataTypes.INTEGER
      }, playerId : {
        type: DataTypes.INTEGER
      }, tournament : {
        type: DataTypes.STRING
      }, result : {
        type: DataTypes.STRING
      },
    }, {
      tableName: 'typeMatch',
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
    
    TypeMatchModel.associate = () => {
      TypeMatchModel.belongsTo(datasource.models.PlayerModel, {
        foreignKey: 'playerId',
        as: 'player'
      });
      TypeMatchModel.belongsTo(datasource.models.VideoModel, {
        foreignKey: 'videoId',
        as: 'tag'
      });
    };

    return TypeMatchModel;
  }
};
  