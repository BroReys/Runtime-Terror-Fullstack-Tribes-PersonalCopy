const findKingdomByUserId = async (userId) => {
  if (userId === 1) {
    return {
      name: "TestKingdom",
      coordinateX: 1,
      coordinateY: 1,
      userId: 1
    }
  } else if (userId === 2) {
    return null;
  }
}

const findKingdomById = async (kingdomId) => {
  let kingdom = {
    id: 1,
    name: "Kingdom",
    coordinateX: 2,
    coordinateY: 2,
    userId: 1,
    gold: 10,
    food: 10
  }
  if (kingdomId !== kingdom.id) {
    return null;
  } else {
    return kingdom;
  }
}

export default {
  findKingdomByUserId,
  findKingdomById
}