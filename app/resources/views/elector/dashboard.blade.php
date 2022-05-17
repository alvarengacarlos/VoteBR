@extends("base")

@section("title", "Dashboard eleitor")

@section("content")
<div>
    <h1>Dashboard eleitor</h1>
    @if ($errors->any())    
    <ul>
        @foreach ($errors->all() as $error)
        <li>{{ $error }}</li>
        @endforeach
    </ul>    
    @endif    
    @forelse ($electionResearchArray as $electionResearch) 
    <div>
        <h3>Pesquisa eleitoral: {{ $electionResearch["id"] }}</h3>
        <p>Criado em: {{ $electionResearch["createIn"] }}</p>
        <p>Iniciada em: {{ $electionResearch["startIn"] }}</p>
        <p>Total de Votos recebidos: {{ $electionResearch["totalOfVotes"] }}</p>
        <p>Candidatos:</p>        
        @foreach ($electionResearch["candidatesList"] as $candidate)
            <div>
                <figure><img src="{{ asset($candidate['photoUrl']) }}" alt="foto do candidato {{ $candidate['name'] }}" width="300px"></figure>
                <p>Nome:{{ $candidate["name"] }}</p>
                <p>Número: {{ $candidate["id"] }}</p>
            </div>
        @endforeach                                  
        @if ($electionResearch["isStart"])            
        <div>
            <form action="{{ route('elector.http-vote') }}" method="post">
                @csrf
                <label for="cpf">CPF:</label>
                <input type="text" name="cpf" id="cpf" minlength="11" maxlength="11">
                <label for="birthDate">Data de Nascimento:</label>
                <input type="date" name="birthDate" id="birthDate">
                <label for="numberOfCandidate">Número do candidato:</label>
                <input type="text" name="numberOfCandidate" id="numberOfCandidate" minlength="2" maxlength="2">
                <input type="submit" value="Votar">
            </form>
        </div>
        @endif
    </div>
    @empty
        <p>Descupe mas não temos pesquisas eleitorais em andamento no momento</p>
    @endforelse    
</div>
@endsection