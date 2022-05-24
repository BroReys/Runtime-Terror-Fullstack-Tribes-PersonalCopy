"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var convertToRoman = function convertToRoman(num) {
  if (isNaN(num)) return NaN;
  var digits = String(+num).split(""),
      key = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM", "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC", "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"],
      roman = "",
      i = 3;

  while (i--) {
    roman = (key[+digits.pop() + i * 10] || "") + roman;
  }

  return Array(+digits.join("") + 1).join("M") + roman;
};

var _default = convertToRoman;
exports["default"] = _default;
//# sourceMappingURL=romanize.js.map