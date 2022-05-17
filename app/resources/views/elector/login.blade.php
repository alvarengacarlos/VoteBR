@extends("base")

@section("title", "Login eleitor")

@section("content")
<div>
    <h1>Login eleitor</h1>
    @if ($errors->any())    
    <ul>
        @foreach ($errors->all() as $error)
        <li>{{ $error }}</li>
        @endforeach
    </ul>    
    @endif
    <div>
        <form action="{{ route('elector.auth') }}" method="post">
            @csrf        
            <input type="submit" value="Entrar">
        </form>
    </div>
@endsection()
</div>