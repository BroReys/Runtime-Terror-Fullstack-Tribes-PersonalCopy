import {troopRules} from "../rules/troops-rules";

const createsAtUnitLevel = (type) => {
  for (let val in troopRules()) {
    if (val === type) {
      return Math.floor(Date.now()/1000 + (60 * troopRules()[val].upgrade_time));
    }
  }
}

export {createsAtUnitLevel};