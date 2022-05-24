const aiRules = days => ({
    number_of_troops: 5*days,
    unit_level: 1*days,
    max_unit_level: 20,
    maxDays: 7
});

export {aiRules};
