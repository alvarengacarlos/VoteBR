# __VoteBr__
Esta aplicação tem por objetivo fazer a pesquisa de intenção de voto do ano de 2022 para o Presidente da República Federativa do Brasil fazendo o uso da tecnologia Blockchain Permissionada [Hyperleger Fabric](https://www.hyperledger.org/use/fabric).


## __Resumo__
É claro que as pesquisas eleitorais são confiáveis do ponto de vista estatístico sendo aplicadas em grupos de pessoas previamente selecionadas que irão representar todos os eleitores e posteriormente nos dar os resultados concretos das intenções de votos. Porém do ponto de vista social não há confiança nos resultados obtidos devido ao formato em que são feitas, ou seja, surge a seguinte questão: Como uma pessoa ou um grupo delas pode me representar?

Diante disso é levantada a seguinte argumentação: É possível criar uma nova forma de pesquisa eleitoral que abranja a todos trazendo transparência, anonimato, aceitação e confiança dos eleitores?

Pensando neste problema, surge a ideia da criação de uma aplicação online utilizando a tecnologia Blockchain Permissionada [Hyperledger Fabric](https://www.hyperledger.org/use/fabric) para a coleta das intenções de votos para Presidência da República Federativa do Brasil, atendendo aos requisitos apresentados anteriormente, e obviamente fazendo a divulgação dos resultados da mesma. 

Segundo [Jota Info](https://www.jota.info/eleicoes/candidatos-a-presidencia-em-2022-quem-sao-23032022), [Poder 360](https://www.poder360.com.br/eleicoes/conheca-os-12-pre-candidatos-a-presidencia-da-republica-em-2022/) e [G1 Globo](https://g1.globo.com/politica/noticia/2021/11/29/eleicoes-2022-veja-quem-sao-os-pre-candidatos-a-presidente-ate-o-momento.ghtml) estão concorrendo atualmente a cadeira da presidência da república em média 11 candidatos. Dentre este, apenas quatro se destacam nas pesquisas realizadas pelo [Datafolha](https://www1.folha.uol.com.br/poder/2022/03/datafolha-bolsonaro-ganha-folego-e-marca-26-no-1o-turno-lula-lidera-com-43.shtml), sendo em ordem alfabética: Ciro Gomes, Jair Bolsonaro, João Dória e Luiz Lula.

Para a identificação dos candidatos foi utilizado como referência o [TSE](https://www.tse.jus.br/partidos/partidos-registrados-no-tse) que abriga uma tabela com uma enorme quantidade de partidos regulados no Brasil.

Desta forma a identificação ficou da seguinte forma:
|Nome|Partido|Número|
|:---:|:---:|:---:|
|Ciro Gomes|PDT|12|
|Jair Bolsonaro|PT|13|
|João Doria|PSDB|45|
|Luiz Lula|PT|13|
|Nulos ou Brancos||1|
|Não Sabe||2|

__Palavras Chave:__ Presidente, Pesquisas; Intenção de Voto, Blockchain.


## __Documentação__
O projeto é divido em duas partes. Uma compões o contrato inteligênte e a outra a aplicação que irá conversar com o contrato.

Clique no link e leia a [documentação oficial do contrato](./contract/docs/Index.md).

Clique no link e leia a [documentação oficial da aplicação](./api-contract/docs/Index.md).


## __Linceça__
A licença em: [licença](./LICENSE).