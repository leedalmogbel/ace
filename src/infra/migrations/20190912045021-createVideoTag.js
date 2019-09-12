'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.createTable('videoTags', {
      id : {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      }, 
      videoId : {
        type: Sequelize.INTEGER
      }, opponent : {
        type: Sequelize.STRING
      }, matchType : {
        type: Sequelize.STRING
      }, set : {
        type: Sequelize.INTEGER
      }, game : {
        type: Sequelize.INTEGER
      }, matchLength : {
        type: Sequelize.DATE
      }, location : {
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
    return queryInterface.dropTable('videoTags');
  }
};
