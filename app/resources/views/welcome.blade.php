@extends("base")

@section("title", "Página Inicial")

@section("content")
<div>
    <h2>O que é VoteBr?</h2>
    <p>
        É uma aplicação descentralizada ou em inglês decentralized application (Dapp), que são aplicações que utilizam Blockchain,
        focada em coletar votos dos eleitores em pesquisas eleitorais para presidência da Repúbica Federativa do Brasil.
    </p>
    <h2>Como participar das pesquisas eleitorais?</h2>        
    <ol>
        <li>Acesse o <a href="{{ route('elector.dashboard') }}" target="_blank">Dashboard.</a></li>
        <li>Observe que aparecerá a pesquisa eleitoral disponível.</li>
        <li>Escolha o candidato</li>
        <li>preencha seu CPF, sua data de nascimento e o número do candidato que escolheu.</li>
        <li>Por fim clique em votar.</li>
        <li>Será gerada uma senha para que você consulte seu voto posteriormente. É de suma importância que você guarde-a em um local seguro e não a informe-a a ninguem.</li>
        <li>Pronto você já contribuiu com a pesquisa.</li>
    </ol>
    <h2>VoteBr é uma enquete online?</h2>
    <p>
        Não. Ao contrário de enquetes, VoteBr permite apenas um único voto. Além disso tentamos 
        disponibiliza-lo para o maior público possível para evitar desbalanceamentos.
    </p>
</div>
@endsection

