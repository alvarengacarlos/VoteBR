# Candidate
Este representa o candidato ao cargo eleitoral, ou seja, são as pessoas em quem os eleitores irão votar. Seu objeto é representado da seguinte forma:
```json
{
    "name": "Fulano de Tal",
	"numberOfCandidate": "1",
	"totalOfVotes": 0
}
```
# BirthDate
Este representa a data de nascimento do eleitor. Seu objeto é representado da seguinte forma:
```json
{
    "year": "yyyy",
	"month": "mm",
	"day": "dd"
}
```

# Elector
Este representa o usuário final eleitor que é responsável por fazer o voto. O objeto Elector tem associação com Birthdate e Candidate. Seu o objeto é representado da seguinte forma:
```json
{
    "cpf": "00000000000",  
    "birthDate": {},
    "candidate": {}
}
```