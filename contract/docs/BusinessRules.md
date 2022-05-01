# __Documentação das Regras de Negócio__
## Fluxo do Sistema
- Criar pesquisa eleitoral
- Inserir candidatos
- Remover candidatos
- Iniciar coleta de votos da pesquisa eleitoral
- Eleitores podem votar
- Finalizar a pesquisa eleitoral e coleta de votos

## Ciclo de Vida da Pesquisa Eleitoral
- Criar pesquisa eleitoral
- Inserir candidatos
- Remover candidatos
- Iniciar coleta de votos da pesquisa eleitoral
- Finalizar coleta de votos da pesquisa eleitoral

É possível criar apenas uma pesquisa eleitoral por ciclo de vida, ou seja, se criada uma pesquisa eleitoral deve receber candidatos ser inciada e depois finalizada.

Os candidatos so poderão ser inseridos e removidos após a criação da pesquisa eleitoral não sendo possível após o inicio da coleta de votos.

Ao iniciar a coleta de votos o sistema não permite mais nenhuma alteração na pesquisa eleitoral a não ser a contagem de votos.

Depois de iniciada a coleta de votos os eleitores poderão votar.

Por fim é finalizada a pesquisa eleitoral não permitindo mais nem mesmo alteração na contagem de votos.

Após realizar o voto o eleitor pode consultar o voto.

Durante todos os passos acima citados é possível consultar a pesquisa eleitoral. 

