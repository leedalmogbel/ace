
module.exports = {
  name: 'ClipModel',
  datasource: 'postgresqldb',
  definition: function(datasource, DataTypes) {
    const ClipModel = datasource.define('ClipModel', {
      id : {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      }, 
      video_id : {
        type: DataTypes.INTEGER
      },clip_name : {
        type: DataTypes.STRING
      },start_time : {
        type: DataTypes.DATE
      },end_time : {
        type: DataTypes.DATE
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
        foreignKey: 'video_id',
        as: 'video'
      });
    };

    return ClipModel;
  }
};
  