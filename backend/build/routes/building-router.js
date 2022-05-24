"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _buildingController = _interopRequireDefault(require("../controllers/building-controller"));

var _express = _interopRequireWildcard(require("express"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var Building_router = (0, _express.Router)();
Building_router.use(_express["default"].json());
Building_router.use(_express["default"].urlencoded({
  extended: true
}));
Building_router.get("/kingdoms/:kingdomId/buildings", _buildingController["default"].getBuildingsByKingdomId);
Building_router.post("/kingdoms/:kingdomId/buildings", _buildingController["default"].addBuildingToKingdom);
Building_router.put("/kingdoms/:kingdomId/buildings/:buildingId", _buildingController["default"].upgradeOrTeardownBuilding);
var _default = Building_router;
exports["default"] = _default;
//# sourceMappingURL=building-router.js.map