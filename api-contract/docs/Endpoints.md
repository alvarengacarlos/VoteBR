# __End points da API__
Esta api é dividida em duas partas. Uma podendo ser executada por administradores das pesquisas eleitorais e a outra como eleitor.


## __Leia antes de utilizar__
Todas as rotas da api exceto as de autenticação são protegidas por tokens, ou seja, é necessário passar no cabeçalho da requisição http o parâmetro token com o seu valor.


## __Endpoints para Administradores__
|Rota|Método Http|Retorno|Descrição|
|:---:|:---:|:---:|:---:|
|/admin/auth|post|{token}|Faz a autenticação do usuário e fornece um token que dura 1 hora|
|/admin/create-election-research|post||Cria uma pesquisa eleitoral|
|/admin/insert-candidate-in-the-election-research|post||Insere candidato na pesquisa eleitoral|
|/admin/remove-candidato-of-election-research|delete||Remove um candidato da pesquisa eleitoral|
|/admin/begin-collecting-votes|post||Inicia a coleta de votos|
|/admin/finish-election-research|post||Interrompe a coleta de votos e encerra a pesquisa eleitoral|
|/admin/search-election-research|get|{electionResearch}|Busca uma pesquisa eleitoral pelo ano e mês|
|/admin/search-election-research-without-starting|get|[ {electionResearch} ]|Busca pesquisas eleitorais que ainda não iniciaram a coleta de votos|
|/admin/search-election-research-in-progress|get|[ {electionResearch} ]|Busca pesquisas eleitorais que já iniciaram a coleta de votos|
|/admin/search-election-research-closed|get|[ {electionResearch} ]|Busca pesquisas eleitorais finalizadas|


### __Parâmetros__
```json
/admin/auth

{
    "email": "admin@email.com",
    "password": "adminpw"
}
```

```json
/admin/create-election-research
{
    "yearElection": "2000",
    "monthElection": "01"
}
```

```json
/admin/insert-candidate-in-the-election-research
{
    "name": "Fulano",
    "numberOfCandidate": "01"
}
```

```json
/admin/remove-candidato-of-election-research
{
   "numberOfCandidate": "01"
}
```

```json
/admin/search-election-research
{
    "yearElection": "2000",
    "monthElection": "02"
}
```
    

## __Endpoints para Eleitores__
|Rota|Método Http|Retorno|Descrição|
|:---:|:---:|:---:|:---:|
|/elector/auth|post|token|Faz autenticação do usuário e fornece um token que dura 1 hora|
|/elector/vote|post||Registra um voto para algum candidato|
|/elector/search-elector|get|{elector}|Busca eleitor pelo cpf|
|/elector/search-election-research-in-progress|get|[ {electionResearch} ]|Busca pesquisas eleitorais que estão aceitando votos|
|/elector/search-election-research-closed|get|[ {electionResearch} ]|Busca pesquisas eleitorais finalizadas|


### __Parâmetros__
```json
/elector/auth
{
    "email": "elector@email.com",
    "password": "electorpw"
}
```

```json
/elector/vote
{
    "cpf": "01234567890",
    "birthDate": "2000-01-01",
    "numberOfCandidate": "01"
}
```

```json
/elector/search-elector
{
    "yearElection": "2000",
    "monthElection": "01",
    "cpf": "01234567890"
}
```