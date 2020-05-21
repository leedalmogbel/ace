
module.exports = {
  name: 'VideoModel',
  datasource: 'tennis-trainer-db',
  definition: function(datasource, DataTypes) {
    const VideoModel = datasource.define('VideoModel', {
      id : {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      }, 
      userId : {
        type: DataTypes.INTEGER,
      }, videoName : {
        type: DataTypes.STRING
      }, path : {
        type: DataTypes.STRING
      }, status : {
        type: DataTypes.ENUM('n/a', 'processing', 'done', 'failedProcess', 'serverError'),
        defaultValue: 'n/a'
      }, uploadStatus : {
        type: DataTypes.ENUM('pending', 'uploaded'),
        defaultValue: 'pending'
      }, subActivityOne : {
        type: DataTypes.STRING
      }, matchType : {
        type: DataTypes.STRING
      }, location : {
        type: DataTypes.STRING
      }, date : {
        type: DataTypes.STRING
      }, time : {
        type: DataTypes.STRING
      }, autoCreateClip : {
        type: DataTypes.STRING
      }, source : {
        type: DataTypes.STRING,
        defaultValue: 'mobile'
      }, createdBy : {
        type: DataTypes.INTEGER,
        allowNull: true
      }, updatedBy : {
        type: DataTypes.INTEGER,
        allowNull: true
      }, objective : {
        type: DataTypes.TEXT
      }
    }, {
      tableName: 'videos',
      timestamps: true
    });

    VideoModel.associate = () => {
      VideoModel.hasMany(datasource.models.VideoUsersModel, {
        foreignKey: 'videoId',
        as: 'videoUser'
      });
      VideoModel.hasMany(datasource.models.ClipModel, {
        foreignKey: 'videoId',
        as: 'clips'
      });
      VideoModel.hasOne(datasource.models.DanceModel, {
        foreignKey: 'videoId',
        as: 'dance'
      });
      VideoModel.hasOne(datasource.models.TennisModel, {
        foreignKey: 'videoId',
        as: 'tennis'
      });
    };

    return VideoModel;
  }
};
  