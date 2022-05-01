const electorRoutes = (app) => {

    app.get("/hello", (req, res, next) => {
        res.send("Hello World. Elector");
    });

};

module.exports = electorRoutes;