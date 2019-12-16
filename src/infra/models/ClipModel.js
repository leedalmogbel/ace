
module.exports = {
  name: 'ClipModel',
  datasource: 'tennis-trainer-db',
  definition: function(datasource, DataTypes) {
    const ClipModel = datasource.define('ClipModel', {
      id : {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      }, 
      videoId : {
        type: DataTypes.INTEGER,
        allowNull: false
      }, clipName : {
        type: DataTypes.STRING,
        allowNull: false
      }, set : {
        type: DataTypes.INTEGER
      }, game : {
        type: DataTypes.INTEGER
      }, startTime : {
        type: DataTypes.STRING,
        allowNull: false
      }, endTime : {
        type: DataTypes.STRING,
        allowNull: false
      }, currentSetScore : {
        type: DataTypes.STRING,
      }, currentGameScore : {
        type: DataTypes.STRING,
      }, shotType : {
        type: DataTypes.STRING
      }, moveDirection : {
        type: DataTypes.STRING
      }, hitSpot : {
        type: DataTypes.STRING
      }, shotResult : {
        type: DataTypes.STRING
      }, smartPattern : {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }, goldStandard : {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }, standardShotType : {
        type: DataTypes.STRING
      }, standardMovement : {
        type: DataTypes.STRING
      }, extra : {
        type: DataTypes.STRING,
        defaultValue: 'none'
      }, errorType : {
        type: DataTypes.STRING,
        defaultValue: 'NA'
      }, spin : {
        type: DataTypes.STRING,
        defaultValue: 'NA'
      }, shotDirection : {
        type: DataTypes.STRING,
        defaultValue: 'NA'
      }, speed : {
        type: DataTypes.STRING,
        defaultValue: 'NA'
      }, comments : {
        type: DataTypes.STRING,
      }
    }, {
      tableName: 'clips',
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

    ClipModel.associate = () => {
      ClipModel.belongsTo(datasource.models.VideoModel, {
        foreignKey: 'videoId',
        as: 'video'
      });
      ClipModel.hasMany(datasource.models.ClipPersonModel, {
        foreignKey: 'clipId',
        as: 'personImages'
      });
    };

    return ClipModel;
  }
};
  