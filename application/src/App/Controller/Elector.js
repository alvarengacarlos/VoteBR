const ElectorService = require("../Service/Elector");
const AuthService = require("../Service/Auth");
const ExceptionFormatter = require("../Service/ExceptionFormatter");

class Elector {

    auth(req, res) {
        try {
            const authService = new AuthService();
            const token = authService.authenticateElector(req.body);
                      
            return res.status(200).json({token: token});

        } catch (exception) {            
            const ef = ExceptionFormatter.formatApiException(exception);
            
            return res.status(ef.httpStatusCode).json(ef);
        }
    }

    vote(req, res) {       
        try {                        
            const electorService = new ElectorService()
            const result = electorService.vote(req.body);
            
            return res.send(result);        
        } catch (error) {
            return error;
        }
    }

}

module.exports = new Elector();