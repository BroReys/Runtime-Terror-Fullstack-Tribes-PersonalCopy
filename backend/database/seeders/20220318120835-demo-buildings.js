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
        // buildingToCreate = {
        //   type: buildingStats.name,
        //   position: buildingStats.position,
        //   status: false,
        //   level: 1,
        //   startTime: Math.floor(Date.now() / 1000),
        //   endTime: Math.floor(Date.now() / 1000) + buildingStats.constructionTime,
        //   destroyTime: null,
        //   kingdomId: kingdom.id
        // }

        //generate buildings and associate them with previously seeded kingdoms
    const kingdoms = await queryInterface.sequelize.query(`SELECT id from KINGDOMS order by id desc limit 5;`);
    const kingdomRows = kingdoms[0];

    const buildings = [];
    for (let i = 0; i < kingdomRows.length; i++) {
      buildings.push({
            type: "townhall",
            position: 1,
            status: true,
            level: `${i + 1}`,
            startTime: Math.floor(Date.now() / 1000),
            endTime: Math.floor(Date.now() / 1000) + 3,
            kingdomId: kingdomRows[i].id
          }, {
            type: "mine",
            position: 2,
            status: true,
            level: `${i + 1}`,
            startTime: Math.floor(Date.now() / 1000),
            endTime: Math.floor(Date.now() / 1000) + 3,
            kingdomId: kingdomRows[i].id
          },
          {
            type: "farm",
            position: 3,
            status: true,
            level: `${i + 1}`,
            startTime: Math.floor(Date.now() / 1000),
            endTime: Math.floor(Date.now() / 1000) + 3,
            kingdomId: kingdomRows[i].id
          },
          {
            type: "wall",
            position: 4,
            status: true,
            level: `${i + 1}`,
            startTime: Math.floor(Date.now() / 1000),
            endTime: Math.floor(Date.now() / 1000) + 3,
            kingdomId: kingdomRows[i].id
          },
          {
            type: "barracks",
            position: 5,
            status: true,
            level: `${i + 1}`,
            startTime: Math.floor(Date.now() / 1000),
            endTime: Math.floor(Date.now() / 1000) + 3,
            kingdomId: kingdomRows[i].id
          },
          {
            type: "academy",
            position: 6,
            status: true,
            level: `${i + 1}`,
            startTime: Math.floor(Date.now() / 1000),
            endTime: Math.floor(Date.now() / 1000) + 3,
            kingdomId: kingdomRows[i].id
          },
          {
            type: "marketplace",
            position: 7,
            status: true,
            level: `${i + 1}`,
            startTime: Math.floor(Date.now() / 1000),
            endTime: Math.floor(Date.now() / 1000) + 3,
            kingdomId: kingdomRows[i].id
          },
          {
            type: "hideout",
            position: 8,
            status: true,
            level: `${i + 1}`,
            startTime: Math.floor(Date.now() / 1000),
            endTime: Math.floor(Date.now() / 1000) + 3,
            kingdomId: kingdomRows[i].id
          },
          {
            type: "mercenaries_inn",
            position: 9,
            status: true,
            level: `${i + 1}`,
            startTime: Math.floor(Date.now() / 1000),
            endTime: Math.floor(Date.now() / 1000) + 3,
            kingdomId: kingdomRows[i].id
          }
      );
    }
    await queryInterface.bulkInsert('buildings', buildings, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('buildings', null,
        {truncate: true, cascade: true});
  }
};