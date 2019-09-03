
module.exports = {
  name: 'ClipTagModel',
  datasource: 'postgresqldb',
  definition: function(datasource, DataTypes) {
    const ClipTagModel = datasource.define('ClipTagModel', {
      id : {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      }, 
      clipId : {
        type: DataTypes.INTEGER
      },set : {
        type: DataTypes.INTEGER
      },game : {
        type: DataTypes.INTEGER
      },serveIn : {
        type: DataTypes.BOOLEAN
      },serveWon : {
        type: DataTypes.BOOLEAN
      },
    }, {
      tableName: 'clipTags',
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

    ClipTagModel.associate = () => {
      ClipTagModel.belongsTo(datasource.models.ClipModel, {
        foreignKey: 'clipId',
        as: 'clip'
      });
    };

    return ClipTagModel;
  }
};
  