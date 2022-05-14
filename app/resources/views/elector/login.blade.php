@extends("elector.base")

@section("title", "Login")

@section("content")
<h1>Elector Login</h1>
<div>
    @if ($errors->any())
    <div class="alert alert-danger">
        <ul>
            @foreach ($errors->all() as $error)
            <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
    @endif
    <form action="{{ route('elector.auth') }}" method="post">
        @csrf        
        <input type="submit" value="entrar">
    </form>
    @endsection()
</div>