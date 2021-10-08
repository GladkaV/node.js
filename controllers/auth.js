module.exports = {
    authorizationUser: (req, res) => {
        try {
            res.json('Welcome!');
        } catch (e) {
            res.json(e.message);
        }
    }
};