
module.exports = {
  name: 'VideoTagModel',
  datasource: 'postgresqldb',
  definition: function(datasource, DataTypes) {
    const VideoTagModel = datasource.define('VideoTagModel', {
      id : {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      }, 
      videoId : {
        type: DataTypes.INTEGER
      },opponent : {
        type: DataTypes.STRING
      },matchType : {
        type: DataTypes.STRING
      },set : {
        type: DataTypes.INTEGER
      },game : {
        type: DataTypes.INTEGER
      },matchLength : {
        type: DataTypes.DATE
      },location : {
        type: DataTypes.STRING
      },
    }, {
      tableName: 'videoTags',
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

    VideoTagModel.associate = () => {
      VideoTagModel.belongsTo(datasource.models.VideoModel, {
        foreignKey: 'videoId',
        as: 'video'
      });
      VideoTagModel.hasMany(datasource.models.TypeMatchModel, {
        foreignKey: 'tagId'
      });
      VideoTagModel.hasMany(datasource.models.TypePracticeModel, {
        foreignKey: 'tagId'
      });
    };

    return VideoTagModel;
  }
};
  