@extends("base")

@section("title", "Dashboard eleitor")

@section("content")
<div>
    <h1>Dashboard eleitor</h1>
    @if ($errors->any())            
        @foreach ($errors->all() as $error)
            <div class="alert alert-warning" role="alert">{{ $error }}</div>
        @endforeach        
    @endif   
    @forelse ($electionResearchArray as $electionResearch) 
    <div>
        <h4><b>Pesquisa eleitoral:</b> {{ $electionResearch["id"] }}</h4>
        <p><b>Criado em:</b> {{ $electionResearch["createIn"] }}</p>
        <p><b>Iniciada em:</b> {{ $electionResearch["startIn"] }}</p>
        <p><b>Total de Votos recebidos:</b> {{ $electionResearch["totalOfVotes"] }}</p>
        <p><b>Candidatos</b></p>        
        @foreach ($electionResearch["candidatesList"] as $candidate)
            <div class="card mt-2" style="width: 18rem;">
                <img class="card-img-top" src="{{ asset($candidate['photoUrl']) }}" alt="foto do candidato {{ $candidate['name'] }}" width="300px">
                <div class="card-body">
                    <p class="card-title"><b>Nome:</b> {{ $candidate["name"] }}</p>
                    <p class="card-text"><b>Número:</b> {{ $candidate["id"] }}</p>
                </div>                
            </div>
        @endforeach                                  
        @if ($electionResearch["isStart"])            
        <div>
            <form class="text-center" action="{{ route('elector.http-vote') }}" method="post">
                @csrf
                <div class="form-floating mt-2">                    
                    <input class="form-control" placeholder="01234567890" type="text" name="cpf" id="cpf" minlength="11" maxlength="11">
                    <label for="cpf">CPF</label>
                </div>
                <div class="form-floating mt-2">                    
                    <input class="form-control" placeholder="2000-01-01" type="date" name="birthDate" id="birthDate">
                    <label for="birthDate">Data de Nascimento</label>
                </div>
                <div class="form-floating mt-2">                    
                    <input class="form-control" placeholder="01" type="text" name="numberOfCandidate" id="numberOfCandidate" minlength="2" maxlength="2">
                    <label for="numberOfCandidate">Número do candidato</label>
                </div>
                <input class="btn btn-success mt-2" type="submit" value="Votar">
            </form>
        </div>
        @endif
    </div>
    @empty
        <p>Descupe mas não temos pesquisas eleitorais em andamento no momento</p>
    @endforelse    
</div>
@endsection