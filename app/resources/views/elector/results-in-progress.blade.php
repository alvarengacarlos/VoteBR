@extends("elector.base")

@section("title", "Resultados das pesquisa em andamento")

@section("content")
<h1>Pesquisa em andamento</h1>
<div>
    @forelse ($electionResearchArray as $electionResearch) 
    <div> 
        <p>{{ $electionResearch["id"] }}</p>
        <p>Total de Votos: {{ $electionResearch["totalOfVotes"] }}</p>
        <p>Criado em: {{ $electionResearch["createIn"] }}</p>                    
        <p>Iniciada em: {{ $electionResearch["startIn"] }}</p>             
        @foreach ($electionResearch["candidatesList"] as $candidate)
            <p>Candidato: {{ $candidate["name"] }}
            <p>Número: {{ $candidate["id"] }}</p>
            <p>Tota de Votos: {{ $candidate["totalOfVotes"] }}</p>
        @endforeach
    </div>
    @empty
    <h4>Não há pesquisas em andamento</h4>
    @endforelse
</div>
@endsection