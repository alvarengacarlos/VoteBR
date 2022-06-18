# Documentação Exceções
|internalCode|httpCode|message|
|:---:|:---:|:---:|
|EXTERNAL_API_EXCEPTION|400|${message}|
|INTERNAL_API_EXCEPTION|500|${message}|
|CCP_NOT_FOUND|500|The ccp.json file not found|
|ADMIN_IDENTITY_DOES_NOT_EXISTS_IN_THE_WALLET|500|Admin identity does not exists in the wallet. Please login with admin from Certificate Authority|
|CONTRACT_CONNECTION_ERROR|500|Sorry it was not possible to link to the contract|
|IDENTITY_ALREADY_EXISTS|500|Idenity already exists in Certificate Authority and wallet|
|CPF_DOES_NOT_EXIST|404|Informed cpf does not exist|
|INVALID_AGE|400|Date of birth informed not valid. You are under 16 years old|
|INVALID_CPF|400|Cpf informed not valid|
|AUTH_FAIL|401|Incorrect email or password|
|FORBIDDEN|403|You do not have access|
|INTERNAL_FAILURE_WHEN_SEARCHING_VOTER|500|Sorry. We are having internal problems|
|TOKEN_EXPIRED|401|Expired token login again|
|SERVER_ERROR|500|${message}|