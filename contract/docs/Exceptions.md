# __Documentação das Exceções__
|internalCode|httpCode|message|
|:---:|:---:|:---:|
|ELECTION_RESEARCH_IN_PROGRESS|400|There is already an election research in progress|
|ELECTION_RESEARCH_CLOSED|400|Election research already closed|
|ELECTION_RESEARCH_NOT_FOUND|404|Election research not found|
|ELECTION_RESEARCH_WITHOUT_STARTING_EXIST|400|Election research without starting exist|
|EXISTING_RECORD|400|This record already exists|
|NOT_EXISTING_RECORD|404|This record not exists|
|TOTAL_OF_CANDIDATES_IS_ZERO|400|It is not possible to start an electoral research with zero candidates|
|UNINITIATED_ELECTION_RESEARCH|400|The electoral research has not been started|
|TOTAL_VOTES_ACHIEVED|500|The established limit of votes received has been reached|
|ACCESS_DENIED|403|Your credentials do not allow access|
|INCORRECT_INFORMATION_RECEIVED|400|Some Information provided does not meet requirements|