module.exports = {
  name: 'FailedQueueModel',
  datasource: 'tennis-trainer-db',
  definition: function(datasource, DataTypes) {
    const FailedQueueModel = datasource.define('FailedQueueModel', {
      id : {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      }, data : {
        type: DataTypes.TEXT,
        allowNull: false
      }, status : {
        type: DataTypes.ENUM('init', 'processing'),
        defaultValue: 'init'
      }, source : {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      tableName: 'failedQueue',
      timestamps: true
    });
    
    return FailedQueueModel;
  }
};
      