const adminRoutes = (app) => {

    const prefix = "/admin";

    app.get(`${prefix}/hello`, (req, res, next) => {
        res.send("Hello World. Admin");
    });

};

module.exports = adminRoutes;