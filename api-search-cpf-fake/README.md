# __Api search cpf fake__
Tem o objetivo de simular consultas feitas na api da receita federal da República Federativa do Brasil.


## __Leia antes de usar__
 - A porta padrão da api é a 5000, podendo ser configurada.
 - Copie o arquivo .env-example e renomeie-o para .env


## __End points__
|Rota|Método|Descrição|
|:---:|:---:|:---:|
|/search-cpf|GET|Pesquisa o cpf informado e devolve um Json com algumas informações|

Este end point necessita dos seguintes query params:
- __token__: Configure qualquer string no env que contenha A-Z e a-z.
- __cpf__: O cpf a ser pesquisado.
- __data-nascimento__: A data de nascimento de quem você esta procurando.
- __plugin__: Deve-se passar __"CPF"__ como valor.


## __Exemplo de consulta__

_localhost:5000/search-cpf_?__token__=test&__cpf__=01234567890&__data-nascimento__=23062000&__plugin__=CPF


## __Exemplo de resposta__
```json
{
    "status": "OK",
    "code": 0,
    "message": "Pesquisa realizada com sucesso.",
    "cpf": "01234567890",
    "nome": "Fulano",
    "data_nascimento": "23/06/2000",
    "situacao_cadastral": "Regular",
    "genero": "M",
    "data_inscricao": "23/06/2000",
    "digito_verificador": "90",
    "comprovante": "True"
}
```