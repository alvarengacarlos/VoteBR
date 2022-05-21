@extends("base")

@section("title", "Resultados das pesquisa em progresso")

@section("content")
<div>            
    <h1 class="text-center">Resultado da pesquisa em progresso</h1>
    @forelse ($electionResearchArray as $electionResearch)
        <div class="pt-2">
            <h4><b>Pesquisa eleitoral:</b> {{ $electionResearch["id"] }}</h4>                        
            <p><b>Criado em:</b> {{ $electionResearch["createIn"] }}</p>        
            <p><b>Iniciada em:</b> {{ $electionResearch["startIn"] }}</p>     
            <p><b>Total de votos recebidos:</b> {{ $electionResearch["totalOfVotes"] }}</p>
        </div>
        @foreach ($electionResearch["candidatesList"] as $candidate)
        <div class="card mt-2" style="width: 18rem;">
            <img class="card-img-top" src="{{ asset($candidate['photoUrl']) }}" alt="Foto do candidato {{ $candidate['name'] }}" width="100px">
            <div class="card-body">                
                <p class="card-text"><b>Nome:</b> {{ $candidate["name"] }}</p>
                <p class="card-text"><b>Número:</b> {{ $candidate["id"] }}</p>            
                <p class="card-title"><b>Total de votos recebidos:</b> {{ $candidate['totalOfVotes'] }}</p>
                @if ($candidate['totalOfVotes'] == 0)                    
                    <div class="progress">
                        <div class="progress-bar p-1" role="progressbar" style="width: 0;" aria-valuenow="{{ $candidate['totalOfVotes'] }}" aria-valuemin="0" aria-valuemax="100">0%</div>
                    </div>
                @else                    
                    <div class="progress">
                        <div class="progress-bar p-1" role="progressbar" style="width: {{ $candidate['totalOfVotes'] * 100 / $electionResearch['totalOfVotes'] }};" aria-valuenow="{{ $candidate['totalOfVotes'] * 100 / $electionResearch['totalOfVotes'] }}" aria-valuemin="0" aria-valuemax="100">{{ $candidate['totalOfVotes'] * 100 / $electionResearch['totalOfVotes'] }}%</div>
                    </div>
                @endif
            </div>
        </div>
        @endforeach        
    @empty
        <p>Não há pesquisas em progresso</p>
    @endforelse
</div>
@endsection