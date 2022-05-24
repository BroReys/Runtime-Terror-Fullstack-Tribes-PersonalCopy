import MapService from "../src/services/map-service";

jest.mock('../src/models/map.js');

test("coordinates are not in valid range", async () => {
    let coordinateX = 2;
    let coordinateY = 25;
    let output = await MapService.identifyKingdom(coordinateX, coordinateY);
    expect(output).toStrictEqual({"error": "One or both provided coordinates are out of range!"});
});

test("coordinate is a negative number", async () => {
    let coordinateX = -4;
    let coordinateY = 5;
    let output = await MapService.identifyKingdom(coordinateX, coordinateY);
    expect(output).toStrictEqual({"error": "One or both provided coordinates are out of range!"});
});

test("coordinate is a string", async () => {
    let coordinateX = "test";
    let coordinateY = 5;
    let output = await MapService.identifyKingdom(coordinateX, coordinateY);
    expect(output).toStrictEqual({"error": "One or both provided coordinates are out of range!"});
});

test("coordinate is not safe integer", async () => {
    let coordinateX = 4;
    let coordinateY = Number.MAX_SAFE_INTEGER + 1;
    let output = await MapService.identifyKingdom(coordinateX, coordinateY);
    expect(output).toStrictEqual({"error": "One or both provided coordinates are out of range!"});
});

test("kingdom is in map", async () => {
    let coordinateX = 3;
    let coordinateY = 6;
    let output = await MapService.identifyKingdom(coordinateX, coordinateY);
    expect(output).toStrictEqual({
        "username": "user",
        "kingdomName": "kingdom",
        "status": "taken"
    })
});

test("kingdom is not in map", async () => {
    let coordinateX = 9;
    let coordinateY = 9;
    let output = await MapService.identifyKingdom(coordinateX, coordinateY);
    expect(output).toStrictEqual({
        "username": null,
        "kingdomName": null,
        "status": "free"
    })
});

