
module.exports = {
  name: 'TypePracticeModel',
  datasource: 'tennis-trainer-db',
  definition: function(datasource, DataTypes) {
    const TypePracticeModel = datasource.define('TypePracticeModel', {
      id : {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      }, 
      tagId : {
        type: DataTypes.INTEGER
      }, playerId : {
        type: DataTypes.INTEGER
      },
    }, {
      tableName: 'typePractice',
      timestamps: true
    });

   

    TypePracticeModel.associate = () => {
      TypePracticeModel.belongsTo(datasource.models.VideoModel, {
        foreignKey: 'videoId',
        as: 'video'
      });
    };

    return TypePracticeModel;
  }
};
  