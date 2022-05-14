@extends("admin.base")

@section("title", "Pesquisas eleitorais em andamento")

@section("content")
    <h2>Pesquisas eleitorais em andamento</h2>
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
   <!--without starting-->
   <h4>Não inicada</h4>
    @forelse ($electionResearchArray as $electionResearch)        
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
                    <form action="{{ route('admin.http-insert-candidate') }}" method="post">
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
                    <form action="{{ route('admin.http-remove-candidate') }}" method="post">
                        @csrf
                        @method("DELETE")
                        <label for="numberOfCandidate">Número do candidato</label>
                        <input type="text" name="numberOfCandidate" id="numberOfCandidate" minlength="2" maxlength="2">
                        <input type="submit" value="Inserir">
                    </form>
                </div>
                <div>                    
                    <form action="{{ route('admin.http-begin-collecting-votes') }}" method="post">
                        @csrf        
                        <input type="submit" value="Iniciar coleta de votos">
                    </form>
                </div>
            @endif
        </div>
        @empty
        <p>Não há pesquisa eleitoral cadastrada</p>
    @endforelse  
@endsection