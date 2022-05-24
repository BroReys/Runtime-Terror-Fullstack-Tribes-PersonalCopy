"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _troopsRules = require("../rules/troops-rules");

// ---> utilities for time creation <---
// ---> this util is used for first troop in array when there is none in academy of same type <---
var createsAt = function createsAt(type) {
  for (var val in (0, _troopsRules.troopRules)()) {
    if (val === type) {
      return Math.floor(Date.now() / 1000 + 60 * (0, _troopsRules.troopRules)()[val].training_time);
    }
  }
}; // ---> this util is used for first troop in array when there IS a troop in academy of same type already <---


var createsAtWhenPreviousExists = function createsAtWhenPreviousExists(type, endTime) {
  for (var val in (0, _troopsRules.troopRules)()) {
    if (val === type) {
      return endTime + 60 * (0, _troopsRules.troopRules)()[val].training_time;
    }
  }
}; // ---> this util is used for rest of the troops in array starting at index 1 <---


var createsAtNextTroop = function createsAtNextTroop(type) {
  for (var val in (0, _troopsRules.troopRules)()) {
    if (val === type) {
      return 60 * (0, _troopsRules.troopRules)()[val].training_time;
    }
  }
};

var _default = {
  createsAt: createsAt,
  createsAtNextTroop: createsAtNextTroop,
  createsAtWhenPreviousExists: createsAtWhenPreviousExists
};
exports["default"] = _default;
//# sourceMappingURL=generate-troop-creation-time.js.map