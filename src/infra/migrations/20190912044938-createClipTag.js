'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.createTable('clipTags', {
      id : {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      }, 
      clipId : {
        type: Sequelize.INTEGER
      }, set : {
        type: Sequelize.INTEGER
      }, game : {
        type: Sequelize.INTEGER
      }, serveIn : {
        type: Sequelize.BOOLEAN
      }, serveWon : {
        type: Sequelize.BOOLEAN
      },
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
    return queryInterface.dropTable('clipTags');
  }
};
