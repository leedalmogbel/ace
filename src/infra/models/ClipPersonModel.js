module.exports = {
  name: 'ClipPersonModel',
  datasource: 'tennis-trainer-db',
  definition: function(datasource, DataTypes) {
    const ClipPersonModel = datasource.define('ClipPersonModel', {
      id : {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      }, 
      clipId : {
        type: DataTypes.INTEGER,
        allowNull: false
      }, image : {
        type: DataTypes.TEXT,
        allowNull: false
      }, centroid : {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      tableName: 'clipPersons',
      timestamps: true
    });
  
    ClipPersonModel.associate = () => {
      ClipPersonModel.belongsTo(datasource.models.ClipModel, {
        foreignKey: 'clipId',
        as: 'clip'
      });
      ClipPersonModel.hasMany(datasource.models.ScoreModel, {
        foreignKey: 'clipPersonId',
        as: 'scores'
      });
      ClipPersonModel.hasMany(datasource.models.PersonKeypointModel, {
        foreignKey: 'clipPersonId',
        as: 'personKeypoints'
      });
    };
  
    return ClipPersonModel;
  }
};
    