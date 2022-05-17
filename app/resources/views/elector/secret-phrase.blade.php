@extends("base")

@section("title", "Frase secreta")

@section("content")
<div>
    @isset ($secretPhrase)
        <p>Sua senha: {{ $secretPhrase }}</p>
        <p>Guarde-a em um lugar seguro e não a informe a ninguém.</p>
        <p>A mesma é necessária para a consulta do seu voto.</p>        
    @endisset
    <a href="{{ route('elector.dashboard') }}">Dashboard</a>
</div>
@endsection