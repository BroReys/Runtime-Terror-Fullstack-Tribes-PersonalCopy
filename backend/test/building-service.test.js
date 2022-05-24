import BuildingService from "../src/services/building-service";

jest.mock("../src/repositories/building-repository.js");
jest.mock("../src/repositories/kingdom-repository.js");

test("Kingdom ID is not a number", async () => {
    const output = BuildingService.checkKingdomIdError("aaa");
    expect(output).toStrictEqual({"error": "Kingdom ID is not a number!"});
})

test("Building ID is not a number", async () => {
    const output = BuildingService.checkBuildingIdError("aaa");
    expect(output).toStrictEqual({"error": "Building ID is not a number!"});
})

test("Add building without type", async () => {
    let type = null;
    let kingdomId = 1;
    const output = await BuildingService.addBuildingToKingdom(kingdomId, type);
    expect(output.inputError).toStrictEqual({"error": "Type is required!"});
})

test("Add building with incorrect type", async () => {
    let type = "building";
    let kingdomId = 1;
    let userId = 1;
    const output = await BuildingService.addBuildingToKingdom(kingdomId, type, userId);
    expect(output.inputError).toStrictEqual({"error": "Incorrect type!"});
})

test("Add building with incorrect kingdom ID", async () => {
    let type = "farm";
    let kingdomId = 4;
    let userId = 1;
    const output = await BuildingService.addBuildingToKingdom(kingdomId, type, userId);
    expect(output.inputError).toStrictEqual({"error": "No kingdom with provided ID!"});
})

test("Add already existing building", async () => {
    let type = "farm";
    let kingdomId = 1;
    let userId = 1;
    const output = await BuildingService.addBuildingToKingdom(kingdomId, type, userId);
    expect(output.inputError).toStrictEqual({"error": "That type of building already exists!"});
})

test("Add building without enough resources", async () => {
    let type = "mine";
    let kingdomId = 1;
    let userId = 1;
    const output = await BuildingService.addBuildingToKingdom(kingdomId, type, userId);
    expect(output.resourceError).toStrictEqual({"error": "Not enough resources!"});
})