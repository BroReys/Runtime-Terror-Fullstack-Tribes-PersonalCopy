import Kingdom from "./kingdom";
import User from "./user";
import {Sequelize} from "sequelize";

const get = async () => {
    return await Kingdom.findAll({
        attributes: ["name", "coordinateX", "coordinateY", [Sequelize.col("user.username"), "username"]],
        raw: true,
        nest: true,
        include: [
            {
                model: User,
                required: true,
                attributes: []
            }
        ],
    });
};

export default {
    get
}