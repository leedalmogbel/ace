
module.exports = {
  name: 'VideoModel',
  datasource: 'postgresqldb',
  definition: function(datasource, DataTypes) {
    const VideoModel = datasource.define('VideoModel', {
      id : {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      }, 
      userId : {
        type: DataTypes.INTEGER
      },videoName : {
        type: DataTypes.STRING
      },
    }, {
      tableName: 'videos',
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

    VideoModel.associate = () => {
      VideoModel.belongsTo(datasource.models.UserModel, {
        foreignKey: 'userId',
        as: 'user'
      });
      VideoModel.hasMany(datasource.models.VideoTagModel, {
        foreignKey: 'videoId'
      });
      VideoModel.hasMany(datasource.models.ClipModel, {
        foreignKey: 'videoId'
      });
    };

     return VideoModel;
  }
};
  