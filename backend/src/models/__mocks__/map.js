const get = async () => {
    return Promise.resolve([{
            name: 'kingdom',
            coordinateX: 3,
            coordinateY: 6,
            username: 'user',
        }, {
            name: 'kingdom2',
            coordinateX: 5,
            coordinateY: 4,
            username: 'user2'
        }]
    );
}

export default {
    get
}