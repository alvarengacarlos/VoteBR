@extends("admin.base")

@section("title", "Pesquisas eleitorais em progresso")

@section("content")
<div>
    <h2>Pesquisa eleitoral em progresso</h2>
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
        <p>Candidatos:</p>
        @foreach ($electionResearch["candidatesList"] as $candidate)
            <div>
                <img src="{{ asset($candidate['photoUrl']) }}" alt="foto do candidato {{ $candidate['name'] }}" width="300px">
                <p>Nome:{{ $candidate["name"] }}</p>
                <p>Número: {{ $candidate["id"] }}</p>
                <p>Total de votos do candidato: {{ $candidate["totalOfVotes"] }}</p>
            </div>   
        @endforeach               
        @if ($electionResearch["isStart"])
            <div>
                <h4>Finalizar pesquisa</h4>
                <form action="{{ route('admin.http-finish-election-research') }}" method="post">
                    @csrf        
                    <input type="submit" value="Finalizar pesquisa eleitoral">
                </form>             
            </div>
        @endif
    </div>
    @empty
        <div>
            <p>Não há pesquisa eleitoral em Andamento</p>
        </div>
    @endforelse
</div>
@endsection