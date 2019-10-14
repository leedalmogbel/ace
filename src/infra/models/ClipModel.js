
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
      }, serveIn : {
        type: DataTypes.BOOLEAN
      }, serveWon : {
        type: DataTypes.BOOLEAN
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
    };

    return ClipModel;
  }
};
  