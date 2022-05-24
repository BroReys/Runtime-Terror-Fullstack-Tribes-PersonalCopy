'use strict';

export default {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

        //generate 5 kingdoms and associate them with previously seeded users
    const users = await queryInterface.sequelize.query(`SELECT id from USERS order by id desc limit 5;`);
    const userRows = users[0];

    const kingdoms = [];
    for (let i = 0; i < userRows.length; i++) {
      kingdoms.push({
        name: `user${userRows[i].id}Kingdom`,
        coordinateX: `${i + 1}`,
        coordinateY: `${i + 1}`,
        gold: 0,
        food: 0,
        goldProduction: 0,
        foodProduction: 0,
        lastTick: Math.floor(Date.now() / 1000),
        updatedAt: new Date(),
        userId: userRows[i].id,
      });
    }
    await queryInterface.bulkInsert('kingdoms', kingdoms, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('kingdoms', null,
        {truncate: true, cascade: true});
  }
};
