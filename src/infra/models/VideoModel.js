
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
        type: DataTypes.ENUM('PENDING', 'UPLOADED'),
        defaultValue: 'PENDING'
      }, opponent : {
        type: DataTypes.STRING
      }, matchType : {
        type: DataTypes.STRING
      }, location : {
        type: DataTypes.STRING
      }, date : {
        type: DataTypes.STRING
      }, time : {
        type: DataTypes.STRING
      }
    }, {
      tableName: 'videos',
      timestamps: true
    });

    VideoModel.associate = () => {
      VideoModel.belongsTo(datasource.models.UserModel, {
        foreignKey: 'userId',
        as: 'user'
      });
      VideoModel.hasMany(datasource.models.ClipModel, {
        foreignKey: 'videoId',
        as: 'clips'
      });
      VideoModel.hasMany(datasource.models.TypeMatchModel, {
        foreignKey: 'videoId',
        as: 'match'
      });
      VideoModel.hasMany(datasource.models.TypePracticeModel, {
        foreignKey: 'videoId',
        as: 'practice'
      });
    };

    return VideoModel;
  }
};
  