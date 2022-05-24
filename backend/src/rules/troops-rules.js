export const troopRules = (upgradeLevel) => ({
      type: ['phalanx', 'swordsman', 'scout', 'cavalry', 'catapult', 'diplomat',
        'settlers'],
      tick_length: 60,
      phalanx: {
        name: 'phalanx',
        foodConsumption: 1,
        attack: 5 * upgradeLevel,
        defence: 10 * upgradeLevel,
        speed: 3 * upgradeLevel,
        carry_limit: 1, // TODO -> could be a building which increases the carry_limit, or keep it simply with upgradeLevel
        training_time: 3, // in minutes
        gold_cost: 3,
        upgrade_cost: 50 * upgradeLevel,
        current_upgrade_level: upgradeLevel,
        upgrade_time: 60,
        image: 'url(\'../../../../assets/img/troops/phalanx300x300.png\')'
      },
      swordsman: {
        name: 'swordsman',
        foodConsumption: 1,
        attack: 10 * upgradeLevel,
        defence: 5 * upgradeLevel,
        speed: 3 * upgradeLevel,
        carry_limit: 1,
        training_time: 3,
        gold_cost: 3,
        upgrade_cost: 50 * upgradeLevel,
        current_upgrade_level: upgradeLevel,
        upgrade_time: 60,
        image: 'url(\'../../../../assets/img/troops/swordsman300x300.jpg\')'
      },
      scout: {
        name: 'scout',
        foodConsumption: 1,
        attack: 5 * upgradeLevel,
        defence: 3 * upgradeLevel,
        speed: 7 * upgradeLevel,
        carry_limit: 3,
        training_time: 4,
        gold_cost: 5,
        upgrade_cost: 80 * upgradeLevel,
        current_upgrade_level: upgradeLevel,
        upgrade_time: 90,
        image: 'url(\'../../../../assets/img/troops/scout300x300.jpg\')'
      },
      cavalry: {
        name: 'cavalry',
        foodConsumption: 1,
        attack: 15 * upgradeLevel,
        defence: 10 * upgradeLevel,
        speed: 10 * upgradeLevel,
        carry_limit: 4,
        training_time: 5,
        gold_cost: 7,
        upgrade_cost: 100 * upgradeLevel,
        current_upgrade_level: upgradeLevel,
        upgrade_time: 90,
        image: 'url(\'../../../../assets/img/troops/cavalry300x300.jpg\')'
      },
      catapult: {
        name: 'catapult',
        foodConsumption: 1,
        attack: 50 * upgradeLevel,
        defence: 40 * upgradeLevel,
        speed: 1 * upgradeLevel,
        carry_limit: 10,
        training_time: 7,
        gold_cost: 20,
        upgrade_cost: 120 * upgradeLevel,
        current_upgrade_level: upgradeLevel,
        upgrade_time: 120,
        image: 'url(\'../../../../assets/img/troops/catapult300x300.png\')'
      },
      diplomat: {
        name: 'diplomat',
        foodConsumption: 1,
        attack: 1 * upgradeLevel,
        defence: 1 * upgradeLevel,
        speed: 5 * upgradeLevel,
        carry_limit: 1,
        training_time: 14,
        gold_cost: 30,
        upgrade_cost: 150 * upgradeLevel,
        current_upgrade_level: upgradeLevel,
        upgrade_time: 140,
        image: 'url(\'../../../../assets/img/troops/diplomat300x300.png\')'
      },
      settlers: {
        name: 'settlers',
        foodConsumption: 1,
        attack: 0,
        defence: 0,
        speed: 1 * upgradeLevel,
        carry_limit: 0,
        training_time: 60,
        gold_cost: 25,
        upgrade_cost: 150 * upgradeLevel,
        upgradeLevel: 100 * upgradeLevel,
        current_upgrade_level: upgradeLevel,
        upgrade_time: 150,
        image: 'url(\'../../../../assets/img/troops/settler300x300.png\')'
      }

    })
;

