@extends("base")

@section("title", "Resultados das pesquisa encerradas")

@section("content")
<div>            
    <h1>Pesquisas eleitorais encerradas</h1>
    @forelse ($electionResearchArray as $electionResearch)    
        <div class="border p-2 mt-4">
            <h4><b>Pesquisa eleitoral:</b> {{ $electionResearch["id"] }}</h4>
            <p><b>Criado em:</b> {{ $electionResearch["createIn"] }}</p>        
            <p><b>Iniciada em:</b> {{ $electionResearch["startIn"] }}</p>     
            <p><b>Finalizada em:</b> {{ $electionResearch["finishIn"] }}</p>  
            <p><b>Total de votos recebidos:</b> {{ $electionResearch["totalOfVotes"] }}</p>
            @foreach ($electionResearch["candidatesList"] as $candidate)
            <div class="border p-2">
                <img src="{{ asset($candidate['photoUrl']) }}" alt="Foto do candidato {{ $candidate['name'] }}" width="50px">
                <span class="me-3"><b>Total de votos recebidos:</b> {{ $candidate['totalOfVotes'] }}</span>
                <span class="me-3"><b>Nome:</b> {{ $candidate["name"] }}</span>
                <span class="me-3"><b>Número:</b> {{ $candidate["id"] }}</span>            
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
            @endforeach        
        </div>
    @empty
        <p>Não há pesquisas em progresso</p>
    @endforelse    
</div>
@endsection