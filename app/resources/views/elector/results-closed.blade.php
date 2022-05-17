@extends("base")

@section("title", "Resultados das pesquisa encerradas")

@section("content")
<div>            
    <h1>Pesquisas encerradas</h1>
    @forelse ($electionResearchArray as $electionResearch)    
        <h3>Pesquisa eleitoral: {{ $electionResearch["id"] }}</h3>                
        <p>Total de votos recebidos: {{ $electionResearch["totalOfVotes"] }}</p>
        <p>Criado em: {{ $electionResearch["createIn"] }}</p>        
        <p>Iniciada em: {{ $electionResearch["startIn"] }}</p>     
        <p>Finalizada em: {{ $electionResearch["finishIn"] }}</p>  
        @foreach ($electionResearch["candidatesList"] as $candidate)
        <div>
            <img src="{{ asset($candidate['photoUrl']) }}" alt="Foto do candidato {{ $candidate['name'] }}" width="100px">
            <span>Total de votos recebidos: {{ $candidate['totalOfVotes'] }}</span>
            <span>Nome: {{ $candidate["name"] }}</span>
            <span>Número: {{ $candidate["id"] }}</span>            
            @if ($candidate['totalOfVotes'] == 0)
                <span><progress value="{{ $candidate['totalOfVotes'] }}" max="100"></progress>{{ $candidate['totalOfVotes'] }}%</span>
            @else
                <span><progress value="{{ $candidate['totalOfVotes'] * 100 / $electionResearch['totalOfVotes'] }}" max="100"></progress>{{ $candidate['totalOfVotes'] * 100 / $electionResearch['totalOfVotes'] }}%</span>
            @endif
        </div>
        @endforeach        
    @empty
        <p>Não há pesquisas em progresso</p>
    @endforelse
</div>
@endsection