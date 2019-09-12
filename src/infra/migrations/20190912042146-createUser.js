'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.createTable('users', [{
      id : {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      }, name : {
        type: Sequelize.STRING
      }, email : {
        type: Sequelize.STRING
      }, userType : {
        type: Sequelize.STRING,
        defaultValue: 'player'
      }, isAdmin : {
        type: Sequelize.BOOLEAN,
        defaultValue: 'f'
      }, googleUserId : {
        type: Sequelize.INTEGER
      },
    }, {
      timestamps: true
    }]);
  },

  down: (queryInterface) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface.dropTable('users');
  }
};
