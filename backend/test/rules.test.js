import {rules} from '../src/rules/rules';
import {buildingRules} from "../src/rules/building-rules";

test('board size larger than 1', () =>
    expect(rules().board_size).toBeGreaterThan(1)
);

test('game tick se to one minute', () =>
    expect(rules().tick_length).toBe(60)
);

test('mining 10 golds on Level 1 per one tick', () =>
    expect(buildingRules(1).mine.generation).toBe(10)
);

test('farming 10 food on Level 1 per one tick', () =>
    expect(buildingRules(1).farm.generation).toBe(10)
);
