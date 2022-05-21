@extends("base")

@section("title", "Frase secreta")

@section("content")
<div>
    @isset ($secretPhrase)
        <p  class="alert alert-warning" role="alert">A informação abaixo é sua senha. Guarde-a em um lugar seguro e não a informe a ninguém. A mesma é necessária para a consulta do seu voto.</p>   
        <p class="alert alert-success" role="alert"><b>Sua senha:</b> {{ $secretPhrase }}</p>             
    @endisset
    <a href="{{ route('elector.dashboard') }}">Dashboard</a>
</div>
@endsection