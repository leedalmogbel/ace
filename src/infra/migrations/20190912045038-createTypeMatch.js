'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.createTable('typeMatch', {
      id : {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      }, 
      tagId : {
        type: Sequelize.INTEGER
      }, playerId : {
        type: Sequelize.INTEGER
      }, tournament : {
        type: Sequelize.STRING
      }, result : {
        type: Sequelize.STRING
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
    return queryInterface.dropTable('typeMatch');
  }
};
