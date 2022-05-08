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

    //TODO: Decidir entre erro API e Blockchain
    async vote(req, res) {       
        try {                        
            const electorService = new ElectorService();
            await electorService.voteInBlockchain(req.body);
            
            return res.status(200).json();  

        } catch (exception) {            
            const ef = ExceptionFormatter.formatApiException(exception);
            
            return res.status(ef.httpStatusCode).json(ef);
        }
    }

    async searchElectionResearchInProgress(req, res) {
        try {                        
            const electorService = new ElectorService();
            const result = await electorService.searchElectionResearchInProgressLikeElectorInBlockchain();
            
            return res.status(200).json({result: result});  

        } catch (exception) {            
            const ef = ExceptionFormatter.formatApiException(exception);
            
            return res.status(ef.httpStatusCode).json(ef);
        }
    }

}

module.exports = new Elector();