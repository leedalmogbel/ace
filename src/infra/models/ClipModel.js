
module.exports = {
  name: 'ClipModel',
  // datasource: 'postgresqldb',
  datasource: 'tennis-trainer-db',
  definition: function(datasource, DataTypes) {
    const ClipModel = datasource.define('ClipModel', {
      id : {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      }, 
      videoId : {
        type: DataTypes.INTEGER
      }, clipName : {
        type: DataTypes.STRING
      }, isGood : {
        type: DataTypes.BOOLEAN 
      }, set : {
        type: DataTypes.INTEGER
      }, game : {
        type: DataTypes.INTEGER
      }, serveIn : {
        type: DataTypes.BOOLEAN
      }, serveWon : {
        type: DataTypes.BOOLEAN
      }, startTime : {
        type: DataTypes.STRING
      }, endTime : {
        type: DataTypes.STRING
      },
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
  