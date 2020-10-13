const getHello = async () => {
    try {
        return "hello";
    } catch (err) {
        console.error(err);
    }
};

module.exports = {
    getHello
};