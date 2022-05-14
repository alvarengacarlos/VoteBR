@extends("admin.base")

@section("title", "Dashboard")

@section("content")
<h1>Admin Dashboard</h1>

<div>
    <h4>Criar pesquisa eleitoral</h4>
    @if ($errors->any())
    <div class="alert alert-danger">
        <ul>
            @foreach ($errors->all() as $error)
            <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
    @endif

    <form action="{{ route('admin.create-election-research') }}" method="post">
        @csrf
        <label for="year">Year</label>
        <input type="text" name="year" id="year" minlength="4" maxlength="4">
        <label for="month">Month</label>
        <input type="text" name="month" id="month" minlength="2" maxlength="2">
        <input type="submit" value="Criar">
    </form>
    
    <h2>Pesquisas eleitorais:</h2>
    <!--without starting-->
    <h4>Não inicada</h4>
    @forelse ($electionResearchWithoutStartingArray as $electionResearch)        
        <div>
            <details>
                <summary>{{ $electionResearch["id"] }}</summary>
                <ul>
                    <li>Criado em: {{ $electionResearch["createIn"] }}</li>
                    <li>
                        Candidatos:
                        <ul>
                        @forelse ($electionResearch["candidatesList"] as $candidate)
                            <li>Candidato: {{ $candidate["name"] }}, Número: {{ $candidate["id"] }}</li>                                                        
                            @empty
                            <li>Vazio<li>
                        @endforelse
                        </ul>
                    </li>
                </ul>
            </details>            
            
            @if (!$electionResearch["isStart"])                
                <div>
                    <h4>Inserir candidato</h4>
                    <form action="{{ route('admin.insert-candidate') }}" method="post">
                        @csrf
                        <label for="nameOfCandidate">Nome do candidato</label>
                        <input type="text" name="nameOfCandidate" id="nameOfCandidate">
                        <label for="numberOfCandidate">Número do candidato</label>
                        <input type="text" name="numberOfCandidate" id="numberOfCandidate" minlength="2" maxlength="2">
                        <label for="urlPhoto">Url da foto</label>
                        <input type="url" name="urlPhoto" id="urlPhoto">
                        <input type="submit" value="Inserir">
                    </form>
                </div>
                <div>
                    <h4>Remover candidato</h4>
                    <form action="{{ route('admin.remove-candidate') }}" method="post">
                        @csrf
                        @method("DELETE")
                        <label for="numberOfCandidate">Número do candidato</label>
                        <input type="text" name="numberOfCandidate" id="numberOfCandidate" minlength="2" maxlength="2">
                        <input type="submit" value="Inserir">
                    </form>
                </div>
                <div>                    
                    <form action="{{ route('admin.begin-collecting-votes') }}" method="post">
                        @csrf        
                        <input type="submit" value="Iniciar coleta de votos">
                    </form>
                </div>
            @endif
        </div>
        @empty
        <p>Não há pesquisa eleitoral cadastrada</p>
    @endforelse

    <h4>Em andamento</h4>
    {{-- <!--In Process-->
    @forelse ($electionResearchInProgressArray as $electionResearch) 
    <div>
        <details>
            <summary>{{ $electionResearch["id"] }}</summary>
                <ul>
                    <li>Total de Votos: {{ $electionResearch["totalOfVotes"] }}</li>
                    <li>Criado em: {{ $electionResearch["createIn"] }}</li>
                    <li>{{ $electionResearch["isClose"] }}</li>                    
                    <li>Iniciada em: {{ $electionResearch["startIn"] ? "Sim" : "Não" }}</li>       
                    <li>Finalizada em: {{ $electionResearch["finishIn"] ? "Sim" : "Não" }}</li>
                    <li>
                        Candidatos:
                        <ul>
                        @forelse ($electionResearch["candidatesList"] as $candidate)
                            <li>Candidato: {{ $candidate["name"] }}, Número: {{ $candidate["id"] }}</li>                            
                            <li>{{ $candidate["totalOfVotes"] }}</li>
                            @empty
                            <li>Vazio<li>
                        @endforelse
                        </ul>
                    </li>
                </ul>
            </details>            
            @if ($electionResearch["isStart"])
                <form action="{{ route('admin.finish-election-research') }}" method="post">
                    @csrf        
                    <input type="submit" value="Finalizar pesquisa eleitoral">
                </form>             
            @endif
    </div>
    @empty
        <p>Não há pesquisa eleitoral em Andamento</p>
    @endforelse
    --}}
    <h4>Fechadas</h4>
    <!--Closed-->
    @forelse ($electionResearchClosedArray as $electionResearch) 
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
</div>

@endsection