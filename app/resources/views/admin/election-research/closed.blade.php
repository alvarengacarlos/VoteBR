@extends("admin.base")

@section("title", "Pesquisas eleitorais em andamento")

@section("content")
    <h2>Pesquisas eleitorais fechadas</h2>
    @if ($errors->any())
        <div class="alert alert-danger">
            <ul>
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif        
    <h4>Fechadas</h4>
    <!--Closed-->
    @forelse ($electionResearchArray as $electionResearch) 
    <div>
        <details>
            <summary>{{ $electionResearch["id"] }}</summary>
                <ul>
                    <li>Total de Votos: {{ $electionResearch["totalOfVotes"] }}</li>
                    <li>Criado em: {{ $electionResearch["createIn"] }}</li>                                     
                    <li>Iniciada em: {{ $electionResearch["startIn"] }}</li>       
                    <li>Finalizada em: {{ $electionResearch["finishIn"] ? "Sim" : "Não" }}</li>
                    <li>
                        Candidatos:
                        <ul>
                        @forelse ($electionResearch["candidatesList"] as $candidate)
                            <li>Candidato: {{ $candidate["name"] }}, Número: {{ $candidate["id"] }}, Total de Votos: {{ $candidate["totalOfVotes"] }}</li>                                                        
                            @empty
                            <li>Vazio<li>
                        @endforelse
                        </ul>
                    </li>
                </ul>
            </details>
    </div>
    @empty
        <p>Não há pesquisas eleitorais finalizadas</p>
    @endforelse
@endsection