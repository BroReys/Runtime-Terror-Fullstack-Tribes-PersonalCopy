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

    const troops = [];
    for (let i = 0; i < kingdomRows.length; i++) {
      let findKingdomId = kingdomRows[i].id
      let unitLevelIdPhalanx = await queryInterface.sequelize.query(`SELECT id FROM UNIT_LEVELS WHERE kingdomId = ${findKingdomId} AND type = "phalanx";`);
      let unitLevelIdDiplomat = await queryInterface.sequelize.query(`SELECT id FROM UNIT_LEVELS WHERE kingdomId = ${findKingdomId} AND type = "diplomat";`);
      let unitLevelIdSwordsman = await queryInterface.sequelize.query(`SELECT id FROM UNIT_LEVELS WHERE kingdomId = ${findKingdomId} AND type = "swordsman";`);
      let unitLevelIdScout = await queryInterface.sequelize.query(`SELECT id FROM UNIT_LEVELS WHERE kingdomId = ${findKingdomId} AND type = "scout";`);
      let unitLevelIdCavalry = await queryInterface.sequelize.query(`SELECT id FROM UNIT_LEVELS WHERE kingdomId = ${findKingdomId} AND type = "cavalry";`);
      let unitLevelIdCatapult = await queryInterface.sequelize.query(`SELECT id FROM UNIT_LEVELS WHERE kingdomId = ${findKingdomId} AND type = "catapult";`);
      let unitLevelIdSettlers = await queryInterface.sequelize.query(`SELECT id FROM UNIT_LEVELS WHERE kingdomId = ${findKingdomId} AND type = "settlers";`);

      troops.push({
            kingdomId: kingdomRows[i].id,
            unitLevelId: unitLevelIdPhalanx[0][0].id,
            type: 'phalanx',
            quantity: 10,
            quantityInBattle: 0
          },
          {
            kingdomId: kingdomRows[i].id,
            unitLevelId: unitLevelIdDiplomat[0][0].id,
            type: 'diplomat',
            quantity: 10,
            quantityInBattle: 0
          },
          {
            kingdomId: kingdomRows[i].id,
            unitLevelId: unitLevelIdSwordsman[0][0].id,
            type: 'swordsman',
            quantity: 10,
            quantityInBattle: 0
          },
          {
            kingdomId: kingdomRows[i].id,
            unitLevelId: unitLevelIdCavalry[0][0].id,
            type: 'cavalry',
            quantity: 10,
            quantityInBattle: 0
          },
          {
            kingdomId: kingdomRows[i].id,
            unitLevelId: unitLevelIdScout[0][0].id,
            type: 'scout',
            quantity: 10,
            quantityInBattle: 0
          },
          {
            kingdomId: kingdomRows[i].id,
            unitLevelId: unitLevelIdCatapult[0][0].id,
            type: 'catapult',
            quantity: 10,
            quantityInBattle: 0
          },
          {
            kingdomId: kingdomRows[i].id,
            unitLevelId: unitLevelIdSettlers[0][0].id,
            type: 'settlers',
            quantity: 1,
            quantityInBattle: 0
          }
      );
    }
    await queryInterface.bulkInsert('troops', troops, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('troops', null,
        {truncate: true, cascade: true});
  }
};

