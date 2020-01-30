
module.exports = {
  name: 'TypeMatchModel',
  datasource: 'tennis-trainer-db',
  definition: function(datasource, DataTypes) {
    const TypeMatchModel = datasource.define('TypeMatchModel', {
      id : {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      }, 
      videoId : {
        type: DataTypes.INTEGER
      }, tournament : {
        type: DataTypes.STRING
      }, result : {
        type: DataTypes.STRING
      },
    }, {
      tableName: 'typeMatch',
      timestamps: true
    });

    TypeMatchModel.associate = () => {
      TypeMatchModel.belongsTo(datasource.models.VideoModel, {
        foreignKey: 'videoId',
        as: 'video'
      });
    };

    return TypeMatchModel;
  }
};
  