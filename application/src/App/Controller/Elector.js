class Elector {

    index(req, res) {
        return res.render('Elector/index', { title: 'Elector', message: 'Hello there!' })
    }

}

module.exports = new Elector();