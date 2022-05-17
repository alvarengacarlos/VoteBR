# __Configuração__
Toda configuração é realizada através de variáveis de ambiente. Altere o nome do arquivo .env-example para .env. Agora vamos as configurações:

## Servidor
- __API_SERVER_PORT__: Configura  a porta onde a API será rodada por padrão é a 3000.

## Credenciais da API
Estas credenciais são utilizadas para a obtenção de tokens.
- __API_ADMIN_EMAIL__: Configura o email do usuário administrador das pesquisas eleitorais.
- __API_ADMIN_PASSWORD__: Configura a senha do usuário administrador das pesquisas eleitorais.
- __API_ELECTOR_EMAIL__: Configura o email do usuário eleitor.
- __API_ELECTOR_PASSWORD__: Configura a senha do usuário eleitor.

## Token
- __API_JWT_TOKEN_PRIVATE_KEY__: A palavra chave para a criação do token JWT. Geralmente deve ser escolhida uma frase e então fazer o hashing da mesma. Então o hashing deve ser colocado aqui.

## API Sintegraws
- __API_SEARCH_CPF_URL__: Configura o endereço da URL que será utilizada para validar o CPF. O sistema foi construido para utilizar a _Sintegraws_, mas não deve ser difícil a sua troca.
- __API_SEARCH_CPF_TOKEN__: Token fornecido pela _Sintegraws_.
- __API_SEARCH_CPF_PLUGIN__: Deve ser mantida a opção "CPF" para que busque no site da Receita Federal. Para mais configurações acesse o [Sintegraws](https://www.sintegraws.com.br/api/documentacao-api-receita-federal-cpf.php).

## Identidades da Blockchain
 O usuário administrador é quem pode realizar operações de manipulação da pesquisa. Já o usuário eleitor é quem pode pode manipular seu voto.

- __CONTRACT_ADMIN_IDENTITY_USERNAME__: Usuário do administrador para acessar a Blockchain. Será criado dentro da pasta _wallet_ ao inciar a aplicação. Este valor é salvo na Blockchain. Ex: "electionAdmin".
- __CONTRACT_ADMIN_IDENTITY_PASSWORD__: Senha do administrador para acessar a Blockchain. Ex: "electionAdminpw".
- __CONTRACT_ELECTOR_IDENTITY_USERNAME__: Usuário do eleitor para acessar a Blockchain. Será criado dentro da pasta _wallet_ ao inciar a aplicação. Este valor é salvo na Blockchain. Ex: "elector".
- __CONTRACT_ELECTOR_IDENTITY_PASSWORD__: Senha do eleitor para acessar a Blockchain. Ex: "electorpw".

## Chaincode ou Smartcontract
- __CONTRACT_CCP_ABSOLUTE_PATH__: Caminho onde está localizado o CCP.json. Ex: "/home/user/VoteBr/api-contract/ccp.json".
- __CONTRACT_CHAINCODE_NAME__: Nome do contrato quando feito o deploy. Ex: "vote-br-contract".
- __CONTRACT_CHANNEL_NAME__: O nome do canal utilizado na rede. Ex: "mychannel"

## Autoridade Certificadora
- __CONTRACT_CA_HOSTNAME__: Nome do host da autoridade certificadora. Ex: "org1ca-api.127-0-0-1.nip.io:8080".
- __CONTRACT_ORG_MSP_ID__: Id do MSP da organização. Ex: "Org1MSP".
- __CONTRACT_AFFILIATION_NAME__: Afiliação da organização, se houver. Ex: "sala de TI". Geralmente este valor é somente uma string sem nada dentro.
- __CONTRACT_ORG_ADMIN_USER__: O usuário administrador da autoridade certificadora. Ex: "admin".
- __CONTRACT_ORG_ADMIN_PASSWD__: A senha do usuário administrador da autoridade certificadora. Ex: "adminpw".