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

        //generate unit_levels and associate them with previously seeded kingdoms
    const kingdoms = await queryInterface.sequelize.query(`SELECT id from KINGDOMS order by id desc limit 5;`);
    const kingdomRows = kingdoms[0];

    const unitLevels = [];
    for (let i = 0; i < kingdomRows.length; i++) {
      unitLevels.push({
            kingdomId: kingdomRows[i].id,
            type: 'phalanx',
            upgradeLevel: `${i + 1}`
          },
          {
            kingdomId: kingdomRows[i].id,
            type: 'swordsman',
            upgradeLevel: `${i + 1}`
          },
          {
            kingdomId: kingdomRows[i].id,
            type: 'scout',
            upgradeLevel: `${i + 1}`
          },
          {
            kingdomId: kingdomRows[i].id,
            type: 'cavalry',
            upgradeLevel: `${i + 1}`
          },
          {
            kingdomId: kingdomRows[i].id,
            type: 'catapult',
            upgradeLevel: `${i + 1}`
          }, {
            kingdomId: kingdomRows[i].id,
            type: 'diplomat',
            upgradeLevel: `${i + 1}`
          },
          {
            kingdomId: kingdomRows[i].id,
            type: 'settlers',
            upgradeLevel: `${i + 1}`
          }
      );
    }
    await queryInterface.bulkInsert('unit_levels', unitLevels, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('unit_levels', null,
        {truncate: true, cascade: true});
  }
};
