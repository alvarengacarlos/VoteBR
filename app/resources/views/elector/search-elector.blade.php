@extends("elector.base")

@section("title", "Consultar Voto")

@section("content")
<div>
    <h4>Consultar Voto</h4>
        <form action="{{ route('elector.http-search-elector') }}" method="POST">          
            @csrf
            <label for="cpf">CPF</label>
            <input type="text" name="cpf" id="cpf" minlength="11" maxlength="11">
            <label for="yearElection">Ano da pesquisa</label>
            <input type="text" name="yearElection" id="yearElection" minlength="4" maxlength="4">
            <label for="monthElection">Mês da pesquisa</label>
            <input type="text" name="monthElection" id="monthElection" minlength="2" maxlength="2">
            <label for="passwordGenerated">Senha gerada pelo sistema</label>
            <input type="text" name="passwordGenerated" id="passwordGenerated">
            <input type="submit" value="Consultar">
        </form> 

        @isset($voteOfElector) 
            <h4>Seu voto</h4>
            <p>{{ $voteOfElector["candidate"]["id"] }}</p>
            <p>{{ $voteOfElector["candidate"]["name"] }}</p>
        @endisset       
</div>
@endsection