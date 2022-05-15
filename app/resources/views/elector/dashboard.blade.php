@extends("elector.base")

@section("title", "Dashboard")

@section("content")
<h1>Elector Dashboard</h1>
<div>
    @if ($errors->any())
    <div class="alert alert-danger">
        <ul>
            @foreach ($errors->all() as $error)
            <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
    @endif
    <!--Election Research-->
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
                            <li>Candidato: {{ $candidate["name"] }}, Número: {{ $candidate["id"] }}, Url da Foto: {{ $candidate["photoUrl"] }}</li>
                            @empty
                            <li>Vazio<li>
                        @endforelse
                        </ul>
                    </li>
                </ul>
            </details>            
            @if ($electionResearch["isStart"])
                <!--Vote form-->
                <form action="{{ route('elector.http-vote') }}" method="post">
                    @csrf
                    <label for="cpf">CPF</label>
                    <input type="text" name="cpf" id="cpf" minlength="11" maxlength="11">
                    <label for="birthDate"></label>
                    <input type="date" name="birthDate" id="birthDate">
                    <label for="numberOfCandidate">Número do candidato</label>
                    <input type="text" name="numberOfCandidate" id="numberOfCandidate" minlength="2" maxlength="2">
                    <input type="submit" value="Votar">
                </form>
            @endif
    </div>
    @empty
        <p>Não há pesquisa eleitoral em Andamento. Aguarde em breve teremos uma nova pesquisa</p>
    @endforelse    
    <h4>Opções</h4>
    <a href="{{ route('elector.view-search-elector') }}" target="_blank">Consultar Voto</a>       
    <a href="{{ route('elector.view-results-in-progress') }}" target="_blank">Pesquisa em andamento</a>    
    <a href="{{ route('elector.view-results-closed') }}" target="_blank">Pesquisas encerradas</a>
</div>
@endsection