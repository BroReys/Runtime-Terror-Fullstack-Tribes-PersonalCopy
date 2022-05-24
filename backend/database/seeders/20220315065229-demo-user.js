'use strict';
import hashPassword from "../../src/utilities/hash-password";
import expiresIn from "../../src/utilities/generate-day-expiration-number";
import generateConfirmationToken
  from "../../src/utilities/generate-confirmation-token";

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

        //generate 5 activated users
    const users = [];
    for (let i = 0; i < 5; i++) {
      users.push({
        username: `user${i + 1}`,
        email: `user${i + 1}@example.com`,
        active: true,
        password: await hashPassword('Password123'),
        registrationTokenExpiresAt: expiresIn(),
        registrationToken: generateConfirmationToken(),
        registeredAt: Math.floor(Date.now() / 1000)
      });
    }
    await queryInterface.bulkInsert('users', users, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('users', null, {});
  }
};
