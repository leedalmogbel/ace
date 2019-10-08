
module.exports = {
  name: 'MoveKeypointModel',
  datasource: 'tennis-trainer-db',
  definition: function(datasource, DataTypes) {
    const MoveKeypointModel = datasource.define('MoveKeypointModel', {
      id : {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      }, 
      clipId : {
        type: DataTypes.INTEGER,
        allowNull: false
      }, clipPath : {
        type: DataTypes.STRING
      },
    }, {
      tableName: 'moveKeypoints',
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

    return MoveKeypointModel;
  }
};
  