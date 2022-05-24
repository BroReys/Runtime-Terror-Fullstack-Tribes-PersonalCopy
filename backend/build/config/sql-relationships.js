"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _database = _interopRequireDefault(require("./database"));

var _message = _interopRequireDefault(require("../models/chat-models/message"));

var _chat = _interopRequireDefault(require("../models/chat-models/chat"));

var _chatMembers = _interopRequireDefault(require("../models/chat-models/chat-members"));

var _user = _interopRequireDefault(require("../models/user"));

var _kingdom = _interopRequireDefault(require("../models/kingdom"));

var _building = _interopRequireDefault(require("../models/building"));

var _troops = _interopRequireDefault(require("../models/troops-models/troops"));

var _unitLevel = _interopRequireDefault(require("../models/unit-level"));

var _troopsInBarracks = _interopRequireDefault(require("../models/troops-models/troops-in-barracks"));

var _battle = _interopRequireDefault(require("../models/battle/battle"));

var _attackerLostTroopsInBattle = _interopRequireDefault(require("../models/battle/attacker-lost-troops-in-battle"));

var _defenderLostTroopsInBattle = _interopRequireDefault(require("../models/battle/defender-lost-troops-in-battle"));

var _attackerTroopsToBattle = _interopRequireDefault(require("../models/battle/attacker-troops-to-battle"));

var _espionageBuildings = _interopRequireDefault(require("../models/espionage/espionage-buildings"));

var _espionageReport = _interopRequireDefault(require("../models/espionage/espionage-report"));

var _espionageTroops = _interopRequireDefault(require("../models/espionage/espionage-troops"));

var _kingdomService = _interopRequireDefault(require("../services/kingdom-service"));

var createRelationships = function createRelationships() {
  _espionageTroops["default"].belongsTo(_espionageReport["default"], {
    as: 'espionageTroops',
    foreignKey: 'espionageReportId',
    setEspionageTroops: function setEspionageTroops(espionageReport) {
      this.setDataValue('espionageReport', espionageReport);
    }
  });

  _espionageReport["default"].hasMany(_espionageTroops["default"], {
    as: 'espionageTroops',
    foreignKey: 'espionageReportId',
    getEspionageTroops: function getEspionageTroops() {
      return this.getDataValue('espionageTroops');
    }
  });

  _espionageBuildings["default"].belongsTo(_espionageReport["default"], {
    as: 'espionageBuildings',
    foreignKey: 'espionageReportId',
    setEspionageBuildings: function setEspionageBuildings(espionageReport) {
      this.setDataValue('espionageReport', espionageReport);
    }
  });

  _espionageReport["default"].hasMany(_espionageBuildings["default"], {
    as: 'espionageBuildings',
    foreignKey: 'espionageReportId',
    getEspionageBuildings: function getEspionageBuildings() {
      return this.getDataValue('espionageBuildings');
    }
  });

  _espionageReport["default"].belongsTo(_battle["default"], {
    as: 'espionageReport',
    foreignKey: 'battleId'
  });

  _battle["default"].hasOne(_espionageReport["default"], {
    as: 'espionageReport',
    foreignKey: 'battleId',
    getEspionageReport: function getEspionageReport() {
      return this.getDataValue('espionageReport');
    }
  });

  _battle["default"].belongsTo(_user["default"], {
    as: 'Attacker',
    foreignKey: 'attacker_id',
    getAttacker: function getAttacker() {
      return this.getDataValue;
    },
    setAttacker: function setAttacker(attacker) {
      this.setDataValue('Attacker', attacker);
    }
  });

  _user["default"].hasMany(_battle["default"], {
    as: 'Attacker',
    foreignKey: 'attacker_id',
    getAttackerBattles: function getAttackerBattles() {
      return this.getDataValue;
    }
  });

  _battle["default"].belongsTo(_user["default"], {
    as: 'Defender',
    foreignKey: 'defender_id',
    getDefender: function getDefender() {
      return this.getDataValue;
    },
    setDefender: function setDefender(defender) {
      this.setDataValue('Defender', defender);
    }
  });

  _user["default"].hasMany(_battle["default"], {
    as: 'Defender',
    foreignKey: 'defender_id',
    getDefenderBattles: function getDefenderBattles() {
      return this.getDataValue;
    }
  });

  _battle["default"].belongsTo(_kingdom["default"], {
    as: 'AttackingKingdom',
    foreignKey: 'attacking_kingdom_id',
    getAttackingKingdom: function getAttackingKingdom() {
      return this.getDataValue;
    },
    setAttackingKingdom: function setAttackingKingdom(attackingKingdom) {
      this.setDataValue('AttackingKingdom', attackingKingdom);
    }
  });

  _kingdom["default"].hasMany(_battle["default"], {
    as: 'AttackingKingdom',
    foreignKey: 'attacking_kingdom_id'
  });

  _battle["default"].belongsTo(_kingdom["default"], {
    as: 'DefendingKingdom',
    foreignKey: 'defending_kingdom_id',
    getDefendingKingdom: function getDefendingKingdom() {
      return this.getDataValue;
    },
    setDefendingKingdom: function setDefendingKingdom(defendingKingdom) {
      this.setDefendingKingdom('DefendingKingdom', defendingKingdom);
    }
  });

  _kingdom["default"].hasMany(_battle["default"], {
    as: 'DefendingKingdom',
    foreignKey: 'defending_kingdom_id'
  });

  _attackerTroopsToBattle["default"].belongsTo(_battle["default"], {
    as: 'attackerTroopsToBattle',
    foreignKey: 'battleId'
  }); // in order to getter to work the 'as' option must be set


  _battle["default"].hasMany(_attackerTroopsToBattle["default"], {
    as: 'attackerTroopsToBattle',
    foreignKey: 'battleId',
    getAttackerTroopsToBattle: function getAttackerTroopsToBattle() {
      return this.getDataValue('attackerTroopsToBattle');
    }
  });

  _attackerLostTroopsInBattle["default"].belongsTo(_battle["default"], {
    as: 'attackerLostTroops',
    foreignKey: 'battleId'
  });

  _battle["default"].hasMany(_attackerLostTroopsInBattle["default"], {
    as: 'attackerLostTroops',
    foreignKey: 'battleId',
    getAttackerLostTroops: function getAttackerLostTroops() {
      return this.getDataValue;
    }
  });

  _defenderLostTroopsInBattle["default"].belongsTo(_battle["default"], {
    as: 'DefenderLostTroops',
    foreignKey: 'battleId'
  });

  _battle["default"].hasMany(_defenderLostTroopsInBattle["default"], {
    as: 'defenderLostTroops',
    foreignKey: 'battleId',
    getDefenderLostTroops: function getDefenderLostTroops() {
      return this.getDataValue;
    }
  });

  _user["default"].hasMany(_kingdom["default"], {
    getKingdoms: function getKingdoms() {
      return this.getDataValue;
    }
  });

  _kingdom["default"].belongsTo(_user["default"], {
    getUser: function getUser() {
      return this.getDataValue;
    },
    setUser: function setUser(user) {
      this.setDataValue('user', user);
    }
  });

  _building["default"].belongsTo(_kingdom["default"], {
    as: 'buildings',
    foreignKey: 'kingdomId'
  });

  _kingdom["default"].hasMany(_building["default"], {
    as: 'buildings',
    foreignKey: 'kingdomId',
    getBuildings: function getBuildings() {
      return this.getDataValue('buildings');
    }
  });

  _troops["default"].belongsTo(_kingdom["default"] //     {
  //   foreignKey: 'kingdomId',
  //   onDelete: 'cascade',
  //   hooks: true
  // }
  );

  _kingdom["default"].hasMany(_troops["default"], {
    getTroops: function getTroops() {
      return this.getDataValue;
    }
  });

  _troopsInBarracks["default"].belongsTo(_kingdom["default"]);

  _kingdom["default"].hasMany(_troopsInBarracks["default"]);

  _troops["default"].belongsTo(_unitLevel["default"], {
    as: 'unitLevel',
    foreignKey: 'unitLevelId',
    getUnitLevel: function getUnitLevel() {
      return this.getDataValue('unitLevel');
    }
  });

  _unitLevel["default"].hasMany(_troops["default"], {
    as: 'unitLevel',
    foreignKey: 'unitLevelId'
  });

  _unitLevel["default"].belongsTo(_kingdom["default"] //     {
  //   foreignKey: 'kingdomId',
  //   onDelete: 'cascade',
  //   hooks: true
  // }
  );

  _kingdom["default"].hasMany(_unitLevel["default"]);

  _chat["default"].belongsTo(_user["default"], {
    as: 'Owner',
    foreignKey: 'owner_id',
    getOwner: function getOwner() {
      return this.getDataValue;
    }
  });

  _user["default"].hasMany(_chat["default"], {
    as: 'Owner',
    foreignKey: 'owner_id'
  });

  _message["default"].belongsTo(_chat["default"]);

  _message["default"].belongsTo(_user["default"], {
    as: 'Author',
    foreignKey: 'author_id',
    getAuthor: function getAuthor() {
      return this.getDataValue;
    }
  });

  _chat["default"].hasMany(_message["default"], {
    getMessages: function getMessages() {
      return this.getDataValue;
    }
  });

  _chat["default"].belongsToMany(_user["default"], {
    through: _chatMembers["default"],
    getUsers: function getUsers() {
      return this.getDataValue;
    }
  });

  _user["default"].belongsToMany(_chat["default"], {
    through: _chatMembers["default"],
    getChats: function getChats() {
      return this.getDataValue;
    }
  });

  _database["default"].sync().then(function (res) {
    console.log(res);

    _kingdomService["default"].createAiKingdoms();
  });
};

var _default = createRelationships;
exports["default"] = _default;
//# sourceMappingURL=sql-relationships.js.map