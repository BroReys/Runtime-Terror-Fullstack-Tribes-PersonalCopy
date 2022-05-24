import {troopRules} from "../rules/troops-rules";
// ---> utilities for time creation <---

// ---> this util is used for first troop in array when there is none in academy of same type <---
const createsAt = (type) => {
  for (let val in troopRules()) {
    if (val === type) {
      return Math.floor(Date.now()/1000 + (60 * troopRules()[val].training_time))
    }
  }
}
// ---> this util is used for first troop in array when there IS a troop in academy of same type already <---
const createsAtWhenPreviousExists = (type, endTime) => {
  for (let val in troopRules()) {
    if (val === type) {
      return endTime + 60 * troopRules()[val].training_time
    }
  }
}
// ---> this util is used for rest of the troops in array starting at index 1 <---
const createsAtNextTroop = (type) => {
  for (let val in troopRules()) {
    if (val === type) {
      return 60 * troopRules()[val].training_time;
    }
  }
}

export default {
  createsAt,
  createsAtNextTroop,
  createsAtWhenPreviousExists
};