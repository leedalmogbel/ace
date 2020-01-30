module.exports = {
  name: 'WhitelistModel',
  datasource: 'tennis-trainer-db',
  definition: function(datasource, DataTypes) {
    const WhitelistModel = datasource.define('WhitelistModel', {
      id : {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      }, 
      email : {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      tableName: 'whitelist',
      timestamps: true,
      indexes: [{
        unique: true,
        fields: ['email']
      }]
    });
      
    
      
    return WhitelistModel;
  }
};
        