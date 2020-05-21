
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
      }, startTime : {
        type: DataTypes.STRING,
        allowNull: false
      }, endTime : {
        type: DataTypes.STRING,
        allowNull: false
      }, shotType : {
        type: DataTypes.STRING
      }, hitSpot : {
        type: DataTypes.STRING
      }, shotResult : {
        type: DataTypes.STRING
      }, shotDirection : {
        type: DataTypes.STRING,
      }, comments : {
        type: DataTypes.STRING,
      }, status : {
        type: DataTypes.STRING,
        defaultValue: 'init'
      }, clipType : {
        type: DataTypes.STRING,
        defaultValue: 'basic'
      }, errorType : {
        type: DataTypes.STRING
      }, winner : {
        type: DataTypes.ENUM('yes', 'no'),
        defaultValue: null
      }, move : {
        type: DataTypes.STRING,
      }, rallyLength : {
        type: DataTypes.STRING,
      }, detectPersonStatus : {
        type: DataTypes.STRING,
        defaultValue: 'init'
      }, createdBy : {
        type: DataTypes.INTEGER,
        allowNull: true
      }, updatedBy : {
        type: DataTypes.INTEGER,
        allowNull: true
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
        as: 'detectedPerson'
      });
    };

    return ClipModel;
  }
};
  