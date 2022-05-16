@extends("admin.base")

@section("title", "Pesquisas eleitorais encerradas")

@section("content")
<div>    
    <h2>Pesquisas eleitorais encerradas</h2>
    @if ($errors->any())        
        <ul>
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>        
    @endif        
    @forelse ($electionResearchArray as $electionResearch)    
        <h3>Pesquisa eleitoral: {{ $electionResearch["id"] }}</h3>                
        <p>Criado em: {{ $electionResearch["createIn"] }}</p>    
        <p>Total de votos recebidos: {{ $electionResearch["totalOfVotes"] }}</p>            
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
        <p>Não há pesquisas finalizadas</p>
    @endforelse
</div>
@endsection