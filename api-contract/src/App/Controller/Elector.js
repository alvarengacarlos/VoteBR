const ElectorService = require("../Service/Elector");
const AuthService = require("../Service/Authentication");
const ExceptionFormatter = require("../Service/ExceptionFormatter");

class Elector {

    authenticate(req, res) {
        try {
            const authService = new AuthService();
            const token = authService.authenticateElector(req.body);
                      
            return res.status(200).json({token: token});

        } catch (exception) {            
            const ef = ExceptionFormatter.formatApiException(exception);
            
            return res.status(ef.httpStatusCode).json(ef);
        }
    }
    
    async vote(req, res) {       
        try {                        
            const electorService = new ElectorService();
            const secretPhrase = await electorService.vote(req.body);
            
            return res.status(201).json({result: secretPhrase});  

        } catch (exception) {            
            const ef = ExceptionFormatter.formatApiException(exception);
            
            return res.status(ef.httpStatusCode).json(ef);
        }
    }

    async searchElector(req, res) {
        try {                        
            const electorService = new ElectorService();
            const result = await electorService.searchElector(req.body);
            
            return res.status(200).json({result: result});  

        } catch (exception) {            
            const ef = ExceptionFormatter.formatApiException(exception);
            
            return res.status(ef.httpStatusCode).json(ef);
        }
    }

    async searchElectionResearchInProgress(req, res) {
        try {                        
            const electorService = new ElectorService();
            const result = await electorService.searchElectionResearchInProgress();
            
            return res.status(200).json({result: result});  

        } catch (exception) {            
            const ef = ExceptionFormatter.formatApiException(exception);
            
            return res.status(ef.httpStatusCode).json(ef);
        }
    }

    async searchElectionResearchClosed(req, res) {
        try {                        
            const electorService = new ElectorService();
            const result = await electorService.searchElectionResearchClosed();
            
            return res.status(200).json({result: result});  

        } catch (exception) {            
            const ef = ExceptionFormatter.formatApiException(exception);
            
            return res.status(ef.httpStatusCode).json(ef);
        }
    }

}

module.exports = new Elector();