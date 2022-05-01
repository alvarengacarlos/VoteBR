# __Documentação dos Objetos__
Abaixo estão os objetos utilizados no contrato inteligente.

## Candidate
Este representa o candidato ao cargo eleitoral, ou seja, são as pessoas em quem os eleitores irão votar. Seu objeto é representado da seguinte forma:
```json
{
    "id": "01",
    "name": "Fulano de Tal",	
	"totalOfVotes": 0
}
```

## Elector
Este representa o usuário final eleitor. Este tem associação com o objeto Candidate. Seu o objeto é representado da seguinte forma:
```json
{
    "id": "2000-01_a9ce3f1ad25d4deee9393c74e5b98f28ac74946a29dfebd24217910b73d234ba", 
    "candidate": {}
}
```

## ElectionResearch
Este representa uma pesquisa eleitoral. Este tem associação com o objeto Candidate. Seu objeto é representado da seguinte forma:
```json
{
    "id": "2000-01",
    "candidatesList": [{}],
    "isStart": false,
    "isClose": false,
    "createIn": "Date",
    "startIn": "Date",
    "finishIn": "Date",
    "totalOfVotes": 0
}
```