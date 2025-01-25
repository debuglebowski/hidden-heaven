module.exports = () => {
    return {
        map: {
            '.mapped-from.json': '.mapped-to.json',
        },

        onItem(config) {
            console.log('item', config.targetItem.name);
        },
    };
};
