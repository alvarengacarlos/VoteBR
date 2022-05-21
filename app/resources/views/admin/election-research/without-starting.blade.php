@extends("admin.base")

@section("title", "Pesquisa eleitoral sem iniciar a coleta de votos")

@section("content")
<div>
    <h2 class="text-center">Pesquisa eleitoral sem iniciar a coleta de votos</h2>
    @if ($errors->any())            
        @foreach ($errors->all() as $error)
            <div class="alert alert-warning" role="alert">{{ $error }}</div>
        @endforeach        
    @endif
    @forelse ($electionResearchArray as $electionResearch)   
        @if (!$electionResearch["isStart"])                            
            <div class="border mt-4">
                <h5 class="text-center mt-2">Inserir candidato</h5>
                <form class="text-center p-2" action="{{ route('admin.http-insert-candidate') }}" method="post">
                    @csrf
                    <div class="form-floating">                            
                        <input class="form-control" placeholder="Fulano de Tal" type="text" name="nameOfCandidate" id="nameOfCandidate">
                        <label for="nameOfCandidate">Nome do candidato</label>
                    </div>
                    <div class="form-floating mt-2">                            
                        <input class="form-control" placeholder="01" type="text" name="numberOfCandidate" id="numberOfCandidate" minlength="2" maxlength="2">
                        <label for="numberOfCandidate">Número do candidato</label>
                    </div>
                    <div class="form-floating mt-2">                            
                        <input class="form-control" placeholder="https://image.com.br" type="url" name="photoUrl" id="photoUrl">
                        <label for="photoUrl">Url da foto</label>
                    </div>
                    <input class="btn btn-primary mt-2" type="submit" value="Inserir">
                </form>
            </div> 
            <div class="border mt-4">                                   
                <form class="text-center p-2" action="{{ route('admin.http-begin-collecting-votes') }}" method="post">
                    @csrf        
                    <input class="btn btn-success mt-2" type="submit" value="Iniciar coleta de votos">
                </form>
            </div>
        @endif 
        <div>
            <h4 class="mt-5">Pesquisa eleitoral: <b>{{ $electionResearch["id"] }}</b></h4>
            <p><b>Criado em:</b> {{ $electionResearch["createIn"] }}</p>            
                <p><b>Candidatos</b></p>
                @forelse ($electionResearch["candidatesList"] as $candidate)                    
                    <div class="card mt-2" style="width: 18rem;">
                        <img class="card-img-top" src="{{ asset($candidate['photoUrl']) }}" alt="foto do candidato {{ $candidate['name'] }}">
                        <div class="card-body">
                            <h5 class="card-title"><b>Nome:</b> {{ $candidate["name"] }}</h5>                            
                            <p class="card-text"><b>Número:</b> {{ $candidate["id"] }}</p>                                                                                  
                            <form class="text-center p-2" action="{{ route('admin.http-remove-candidate') }}" method="post">
                                @csrf
                                @method("DELETE")                                
                                <input type="text" name="numberOfCandidate" value="{{ $candidate['id'] }}" hidden>
                                <input class="btn btn-primary mt-2" type="submit" value="Remover">
                            </form>                            
                        </div>                        
                    </div>                                                                  
                @empty
                    <div>
                        <p><b class="alert alert-warning" role="alert">Sem candidatos cadastrados</b></p>
                    </div>            
                @endforelse            
        </div>
    @empty
        <div>
            <p>Não há pesquisa eleitoral sem iniciar cadastrada</p>
        </div>        
    @endforelse      
</div>
@endsection