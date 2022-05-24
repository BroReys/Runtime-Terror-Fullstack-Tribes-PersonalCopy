"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.aiRules = void 0;

var aiRules = function aiRules(days) {
  return {
    number_of_troops: 5 * days,
    unit_level: 1 * days,
    max_unit_level: 20,
    maxDays: 7
  };
};

exports.aiRules = aiRules;
//# sourceMappingURL=ai-rules.js.map