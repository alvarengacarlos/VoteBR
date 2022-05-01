class Admin {

    index(req, res) {
        return res.render('Admin/index', { title: 'Admin', message: 'Hello there!' })
    }

    login(req, res) {
        return res.send("login");
    }

}

module.exports = new Admin();