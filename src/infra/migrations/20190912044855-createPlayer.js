'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.createTable('players', {
      id : {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      }, 
      userId : {
        type: Sequelize.INTEGER
      }, coachId : {
        type: Sequelize.INTEGER
      }, gender : {
        type: Sequelize.STRING
      }, height : {
        type: Sequelize.INTEGER
      }, weight : {
        type: Sequelize.INTEGER
      }, dominantHand : {
        type: Sequelize.STRING
      }, matchCounter : {
        type: Sequelize.INTEGER
      }, practiceCounter : {
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('players');
  }
};
