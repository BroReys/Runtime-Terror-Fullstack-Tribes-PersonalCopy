import sequelize from "./database";
import Message from "../models/chat-models/message";
import Chat from "../models/chat-models/chat";
import ChatMembers from "../models/chat-models/chat-members";
import User from "../models/user";
import Kingdom from "../models/kingdom";
import Building from "../models/building";
import Troops from "../models/troops-models/troops";
import Unit_level from "../models/unit-level";
import Troops_in_barracks from "../models/troops-models/troops-in-barracks";
import Battle from "../models/battle/battle";
import AttackerLostTroops
  from "../models/battle/attacker-lost-troops-in-battle";
import DefenderLostTroopsAndBuildings
  from "../models/battle/defender-lost-troops-in-battle";
import AttackerTroopsToBattle
  from "../models/battle/attacker-troops-to-battle";
import EspionageBuildings from "../models/espionage/espionage-buildings";
import EspionageReport from "../models/espionage/espionage-report";
import EspionageTroops from "../models/espionage/espionage-troops";
import espionageReport from "../models/espionage/espionage-report";
import KingdomService from "../services/kingdom-service";
import kingdom from "../models/kingdom";

const createRelationships = () => {

  EspionageTroops.belongsTo(EspionageReport, {
    as: 'espionageTroops',
    foreignKey: 'espionageReportId',
    setEspionageTroops(espionageReport) {
      this.setDataValue('espionageReport', espionageReport);
    }
  });

  EspionageReport.hasMany(EspionageTroops, {
    as: 'espionageTroops',
    foreignKey: 'espionageReportId',
    getEspionageTroops() {
      return this.getDataValue('espionageTroops');
    }
  });

  EspionageBuildings.belongsTo(EspionageReport, {
    as: 'espionageBuildings',
    foreignKey: 'espionageReportId',
    setEspionageBuildings(espionageReport) {
      this.setDataValue('espionageReport', espionageReport)
    }
  });

  EspionageReport.hasMany(EspionageBuildings, {
    as: 'espionageBuildings',
    foreignKey: 'espionageReportId',
    getEspionageBuildings() {
      return this.getDataValue('espionageBuildings');
    }
  });

  EspionageReport.belongsTo(Battle, {
    as: 'espionageReport',
    foreignKey: 'battleId'
  });

  Battle.hasOne(EspionageReport, {
    as: 'espionageReport',
    foreignKey: 'battleId',
    getEspionageReport() {
      return this.getDataValue('espionageReport');
    }
  });

  Battle.belongsTo(User, {
    as: 'Attacker',
    foreignKey: 'attacker_id',
    getAttacker() {
      return this.getDataValue;
    },
    setAttacker(attacker) {
      this.setDataValue('Attacker', attacker);
    }
  });

  User.hasMany(Battle, {
    as: 'Attacker',
    foreignKey: 'attacker_id',
    getAttackerBattles() {
      return this.getDataValue;
    }
  });

  Battle.belongsTo(User, {
    as: 'Defender',
    foreignKey: 'defender_id',
    getDefender() {
      return this.getDataValue;
    },
    setDefender(defender) {
      this.setDataValue('Defender', defender);
    }
  });

  User.hasMany(Battle, {
    as: 'Defender',
    foreignKey: 'defender_id',
    getDefenderBattles() {
      return this.getDataValue;
    }
  });

  Battle.belongsTo(Kingdom, {
    as: 'AttackingKingdom',
    foreignKey: 'attacking_kingdom_id',
    getAttackingKingdom() {
      return this.getDataValue;
    },
    setAttackingKingdom(attackingKingdom) {
      this.setDataValue('AttackingKingdom', attackingKingdom);
    }
  });

  Kingdom.hasMany(Battle, {
    as: 'AttackingKingdom',
    foreignKey: 'attacking_kingdom_id'
  });

  Battle.belongsTo(Kingdom, {
    as: 'DefendingKingdom',
    foreignKey: 'defending_kingdom_id',
    getDefendingKingdom() {
      return this.getDataValue;
    },
    setDefendingKingdom(defendingKingdom) {
      this.setDefendingKingdom('DefendingKingdom', defendingKingdom);
    }
  });

  Kingdom.hasMany(Battle, {
    as: 'DefendingKingdom',
    foreignKey: 'defending_kingdom_id'
  });

  AttackerTroopsToBattle.belongsTo(Battle, {
    as: 'attackerTroopsToBattle',
    foreignKey: 'battleId'
  });
  // in order to getter to work the 'as' option must be set
  Battle.hasMany(AttackerTroopsToBattle, {
    as: 'attackerTroopsToBattle',
    foreignKey: 'battleId',
    getAttackerTroopsToBattle() {
      return this.getDataValue('attackerTroopsToBattle');
    }
  })

  AttackerLostTroops.belongsTo(Battle, {
    as: 'attackerLostTroops',
    foreignKey: 'battleId'
  });

  Battle.hasMany(AttackerLostTroops, {
    as: 'attackerLostTroops',
    foreignKey: 'battleId',
    getAttackerLostTroops() {
      return this.getDataValue;
    }
  });

  DefenderLostTroopsAndBuildings.belongsTo(Battle, {
    as: 'DefenderLostTroops',
    foreignKey: 'battleId'
  });

  Battle.hasMany(DefenderLostTroopsAndBuildings, {
    as: 'defenderLostTroops',
    foreignKey: 'battleId',
    getDefenderLostTroops() {
      return this.getDataValue;
    }
  });

  User.hasMany(Kingdom, {
    getKingdoms() {
      return this.getDataValue;
    }
  });

  Kingdom.belongsTo(User, {
    getUser() {
      return this.getDataValue;
    },
    setUser(user) {
      this.setDataValue('user', user);
    }
  });

  Building.belongsTo(Kingdom, {
    as: 'buildings',
    foreignKey: 'kingdomId'
  });

  Kingdom.hasMany(Building, {
    as: 'buildings',
    foreignKey: 'kingdomId',
    getBuildings() {
      return this.getDataValue('buildings');
    }
  });

  Troops.belongsTo(Kingdom,
      //     {
      //   foreignKey: 'kingdomId',
      //   onDelete: 'cascade',
      //   hooks: true
      // }
  );

  Kingdom.hasMany(Troops, {
    getTroops() {
      return this.getDataValue;
    }
  });

  Troops_in_barracks.belongsTo(Kingdom);

  Kingdom.hasMany(Troops_in_barracks);

  Troops.belongsTo(Unit_level, {
    as: 'unitLevel',
    foreignKey: 'unitLevelId',
    getUnitLevel() {
      return this.getDataValue('unitLevel');
    }
  });

  Unit_level.hasMany(Troops, {
    as: 'unitLevel',
    foreignKey: 'unitLevelId'
  });

  Unit_level.belongsTo(Kingdom,
      //     {
      //   foreignKey: 'kingdomId',
      //   onDelete: 'cascade',
      //   hooks: true
      // }
  );

  Kingdom.hasMany(Unit_level);

  Chat.belongsTo(User, {
    as: 'Owner',
    foreignKey: 'owner_id',
    getOwner() {
      return this.getDataValue;
    }
  });

  User.hasMany(Chat, {
    as: 'Owner',
    foreignKey: 'owner_id'
  });

  Message.belongsTo(Chat);

  Message.belongsTo(User, {
    as: 'Author',
    foreignKey: 'author_id',
    getAuthor() {
      return this.getDataValue;
    }
  });

  Chat.hasMany(Message, {
    getMessages() {
      return this.getDataValue;
    }
  });

  Chat.belongsToMany(User, {
    through: ChatMembers,
    getUsers() {
      return this.getDataValue;
    }
  });

  User.belongsToMany(Chat, {
    through: ChatMembers,
    getChats() {
      return this.getDataValue;
    }
  });

  sequelize.sync()
  .then(res => {
    console.log(res);
    KingdomService.createAiKingdoms();
  });
};

export default createRelationships;
