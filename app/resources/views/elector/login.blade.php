@extends("elector.base")

@section("title", "Login")

@section("content")
<h1>Elector Login</h1>
    <form action="{{ route('elector.auth') }}" method="post">
        @csrf        
        <input type="submit" value="entrar">
    </form>
@endsection()