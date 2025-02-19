module.exports = () => {
    return {
        find: {
            items: {
                include: ['.*/', '*.*'],
                exclude: ['package.json'],
            },
        },
    };
};
