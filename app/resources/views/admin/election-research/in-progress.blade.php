@extends("admin.base")

@section("title", "Pesquisas eleitorais em progresso")

@section("content")
    <h2>Pesquisas eleitorais em progresso</h2>
    @if ($errors->any())
        <div class="alert alert-danger">
            <ul>
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif
    <h4>Em andamento</h4>
    @forelse ($electionResearchArray as $electionResearch) 
    <div>
        <details>
            <summary>{{ $electionResearch["id"] }}</summary>
                <ul>
                    <li>Total de Votos: {{ $electionResearch["totalOfVotes"] }}</li>
                    <li>Criado em: {{ $electionResearch["createIn"] }}</li>                    
                    <li>Iniciada em: {{ $electionResearch["startIn"] }}</li>
                    <li>
                        Candidatos:
                        <ul>
                        @forelse ($electionResearch["candidatesList"] as $candidate)
                            <li>Candidato: {{ $candidate["name"] }}, Número: {{ $candidate["id"] }}, Total de Votos: {{ $candidate["totalOfVotes"] }}, {{ $candidate["photoUrl"] }}</li>
                            @empty
                            <li>Vazio<li>
                        @endforelse
                        </ul>
                    </li>
                </ul>
            </details>            
            @if ($electionResearch["isStart"])
                <form action="{{ route('admin.http-finish-election-research') }}" method="post">
                    @csrf        
                    <input type="submit" value="Finalizar pesquisa eleitoral">
                </form>             
            @endif
    </div>
    @empty
        <p>Não há pesquisa eleitoral em Andamento</p>
    @endforelse
@endsection