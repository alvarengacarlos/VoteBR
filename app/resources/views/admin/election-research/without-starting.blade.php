@extends("admin.base")

@section("title", "Pesquisa eleitoral sem iniciar a coleta de votos")

@section("content")
<div>
    <h2>Pesquisa eleitoral sem iniciar a coleta de votos</h2>
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
        <p>Candidatos:</p>
        @forelse ($electionResearch["candidatesList"] as $candidate)
            <div>
                <figure><img src="{{ asset($candidate['photoUrl']) }}" alt="foto do candidato {{ $candidate['name'] }}" width="300px"></figure>
                <p>Nome:{{ $candidate["name"] }}</p>
                <p>Número: {{ $candidate["id"] }}</p>
            </div>                                                                  
            @empty
            <div>
                <p>Sem candidatos</p>
            </div>            
        @endforelse
        @if (!$electionResearch["isStart"])                
            <div>
                <h4>Inserir candidato</h4>
                <form action="{{ route('admin.http-insert-candidate') }}" method="post">
                    @csrf
                    <label for="nameOfCandidate">Nome do candidato</label>
                    <input type="text" name="nameOfCandidate" id="nameOfCandidate">
                    <label for="numberOfCandidate">Número do candidato</label>
                    <input type="text" name="numberOfCandidate" id="numberOfCandidate" minlength="2" maxlength="2">
                    <label for="photoUrl">Url da foto</label>
                    <input type="url" name="photoUrl" id="photoUrl">
                    <input type="submit" value="Inserir">
                </form>
            </div>
            <div>
                <h4>Remover candidato</h4>
                <form action="{{ route('admin.http-remove-candidate') }}" method="post">
                    @csrf
                    @method("DELETE")
                    <label for="numberOfCandidate">Número do candidato</label>
                    <input type="text" name="numberOfCandidate" id="numberOfCandidate" minlength="2" maxlength="2">
                    <input type="submit" value="Remover">
                </form>
            </div>
            <div>
                <h4>Iniciar coleta de votos</h4>                    
                <form action="{{ route('admin.http-begin-collecting-votes') }}" method="post">
                    @csrf        
                    <input type="submit" value="Iniciar coleta de votos">
                </form>
            </div>
        @endif
    @empty
        <div>
            <p>Não há pesquisa eleitoral sem iniciar cadastrada</p>
        </div>
    @endforelse  
</div>
@endsection