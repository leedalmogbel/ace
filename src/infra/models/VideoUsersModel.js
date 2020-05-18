
module.exports = {
  name: 'VideoUsersModel',
  datasource: 'tennis-trainer-db',
  definition: function(datasource, DataTypes) {
    const VideoUsersModel = datasource.define('VideoUsersModel', {
      id : {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      }, name : {
        type: DataTypes.STRING,
        allowNull: false
      }, result : {
        type: DataTypes.STRING
      }, videoId : {
        type: DataTypes.INTEGER,
        allowNull: false
      }, userId : {
        type: DataTypes.INTEGER,
        allowNull: true
      }
    }, {
      tableName: 'videoUsers',
      timestamps: false
    });
      
      
    return VideoUsersModel;
  }
};
        