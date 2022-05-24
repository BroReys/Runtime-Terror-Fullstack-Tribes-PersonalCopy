import MapService from "../services/map-service";

const postMap = async (req, res) => {
    const {coordinateX, coordinateY} = req.body;
    const response = await MapService.identifyKingdom(coordinateX, coordinateY);
    if (response.error) {
        res.status(400).json(response);
    } else {
        res.status(200).json(response);
    }
}

export default {
    postMap
}