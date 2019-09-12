'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.createTable('VideoModel', {
      id : {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      }, 
      userId : {
        type: Sequelize.INTEGER,
        // allowNull: false
      }, videoName : {
        type: Sequelize.STRING
      }
    }, {
      timestamps: true
    });
  },

  down: (queryInterface) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface.dropTable('videos');
  }
};
