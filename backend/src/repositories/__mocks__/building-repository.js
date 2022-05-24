const findAllByKingdomIdWhereType = async (kingdomId, type) => {
    if (type === "farm") {
        return ["farm"];
    } else {
        return [];
    }
}

export default {
    findAllByKingdomIdWhereType
}