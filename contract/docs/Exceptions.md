# Exceptions
|InternalCode|HttpCode|Message|
|:---:|:---:|:---:|
|INVALID_CPF|400|The provided cpf is not valid|
|CANDIDATE_DOES_NOT_EXIST|404|Informed candidate does not exist|
|CPF_DOES_NOT_EXIST|404|Informed cpf does not exist|
|INVALID_AGE|400|Date of birth informed not valid. You are under 16 years old|
|INCORRECT_INFORMATION_RECEIVED|400|Some Information provided does not meet requirements|
|EXISTING_RECORD|400|This record already exists|
|NOT_EXISTING_RECORD|404|This record not exists|
|ACCESS_DENIED|403|Your credentials do not allow access|
|ELECTION_RESEARCH_WITHOUT_STARTING_DOES_NOT_EXIST|404|It was not possible to find an election research without starting|
|ELECTION_RESEARCH_WITHOUT_STARTING_EXIST|400|Election research without starting exist|
|ELECTION_RESEARCH_ALREADY_STARTED|400|Election research already started|
|TOTAL_VOTES_ACHIEVED|500|The established limit of votes received has been reached|