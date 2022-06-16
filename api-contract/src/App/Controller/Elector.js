const ElectorService = require("../Service/Elector");
const AuthService = require("../Service/Authentication");
const formatException = require("../Provider/formatException");

class Elector {

    authenticate(req, res) {
        try {
            const authService = new AuthService();
            const token = authService.authenticateElector(req.body);
                      
            return res.status(200).json({token: token});

        } catch (exception) {            
            const exceptionFormated = formatException(exception);
            
            return res.status(exceptionFormated.httpStatusCode).json(exceptionFormated);
        }
    }
    
    async vote(req, res) {       
        try {                        
            const electorService = new ElectorService();
            const secretPhrase = await electorService.vote(req.body);
            
            return res.status(201).json({result: secretPhrase});  

        } catch (exception) {            
            const exceptionFormated = formatException(exception);
            
            return res.status(exceptionFormated.httpStatusCode).json(exceptionFormated);
        }
    }

    async searchElector(req, res) {
        try {                        
            const electorService = new ElectorService();
            const result = await electorService.searchElector(req.body);
            
            return res.status(200).json({result: result});  

        } catch (exception) {            
            const exceptionFormated = formatException(exception);
            
            return res.status(exceptionFormated.httpStatusCode).json(exceptionFormated);
        }
    }

    async searchElectionResearchInProgress(req, res) {
        try {                        
            const electorService = new ElectorService();
            const result = await electorService.searchElectionResearchInProgress();
            
            return res.status(200).json({result: result});  

        } catch (exception) {            
            const exceptionFormated = formatException(exception);
            
            return res.status(exceptionFormated.httpStatusCode).json(exceptionFormated);
        }
    }

    async searchElectionResearchClosed(req, res) {
        try {                        
            const electorService = new ElectorService();
            const result = await electorService.searchElectionResearchClosed();
            
            return res.status(200).json({result: result});  

        } catch (exception) {            
            const exceptionFormated = formatException(exception);
            
            return res.status(exceptionFormated.httpStatusCode).json(exceptionFormated);
        }
    }

}

module.exports = new Elector();