
module.exports = {
  name: 'CoachesModel',
  datasource: 'tennis-trainer-db',
  definition: function(datasource, DataTypes) {
    const CoachesModel = datasource.define('CoachesModel', {
      id : {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      }, 
      userId : {
        type: DataTypes.INTEGER
      }, coachName : {
        type: DataTypes.STRING
      },
    }, {
      tableName: 'coaches',
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

    CoachesModel.associate = () => {
      CoachesModel.belongsTo(datasource.models.UserModel, {
        foreignKey: 'userId',
        as: 'user'
      });
      CoachesModel.hasMany(datasource.models.PlayerModel, {
        foreignKey: 'coachId'
      });
    };
       
    return CoachesModel;
  }
};
  