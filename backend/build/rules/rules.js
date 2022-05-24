"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rules = void 0;

var rules = function rules(level) {
  return {
    board_size: 10,
    tick_length: 60,
    max_position: 10,
    max_townhall_level: 20,
    kingdom: {
      max_food: 2000 * level,
      max_gold: 1000 * level
    },
    winning_rules: {
      registration_window: 604800,
      //7 days from registration
      ratio: 0.5 //how much % of all kingdoms has to be owned by one user to win

    },
    troops: {
      gold: 50 * level
    }
  };
};

exports.rules = rules;
//# sourceMappingURL=rules.js.map