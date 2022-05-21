@extends("base")

@section("title", "Consultar Voto")

@section("content")
<div>
    <h4 class="text-center">Consultar Voto</h4>
    @if ($errors->any())            
        @foreach ($errors->all() as $error)
            <div class="alert alert-warning" role="alert">{{ $error }}</div>
        @endforeach        
    @endif    
    <form class="text-center"  action="{{ route('elector.http-search-elector') }}" method="POST">          
        @csrf    
        <div class="form-floating">
            <input class="form-control" placeholder="01234567890" type="text" name="cpf" id="cpf" minlength="11" maxlength="11">
            <label for="cpf">CPF</label>        
        </div>    
        <div class="form-floating mt-2">
            <input class="form-control" placeholder="2000" type="text" name="yearElection" id="yearElection" minlength="4" maxlength="4">
            <label for="yearElection">Ano da pesquisa</label>        
        </div>
        <div class="form-floating mt-2">
            <input class="form-control" placeholder="01" type="text" name="monthElection" id="monthElection" minlength="2" maxlength="2">
            <label for="monthElection">Mês da pesquisa</label>        
        </div>        
        <div class="form-floating mt-2">
            <input class="form-control" placeholder="kjflsjfelriepofoofg" type="password" name="secretPhrase" id="secretPhrase">
            <label for="secretPhrase">Senha gerada pelo sistema</label>
            <input class="text-justify" type="checkbox" onclick="viewPassword()"><span>Mostrar Senha</span>
            <script>
                function viewPassword() {
                    let secretPhrase = document.getElementById("secretPhrase");
                    if (secretPhrase.type === "password") {
                      secretPhrase.type = "text";
                    } else {
                      secretPhrase.type = "password";
                    }
                }
            </script>            
        </div>
        <input class="btn btn-primary mt-2" type="submit" value="Consultar">
    </form> 
    @isset($voteOfElector) 
        <h4>Seu voto foi para:</h4>        
        <div class="card" style="width: 18rem;">
            <img src="{{ $voteOfElector['candidate']['photoUrl'] }}" alt="foto do candidato {{ $voteOfElector['candidate']['name'] }}">
            <div class="card-body">
                <p class="card-title"><b>Nome:</b> {{ $voteOfElector["candidate"]["name"] }}</p>
                <p class="card-text"><b>Número:</b> {{ $voteOfElector["candidate"]["id"] }}</p>        
            </div>
        </div>        
    @endisset       
</div>
@endsection