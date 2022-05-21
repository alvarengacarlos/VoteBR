@extends("base")

@section("title", "Login Admin")

@section("content")
<div>
    <h4 class="text-center">Admin Login</h4>
    @if ($errors->any())            
        @foreach ($errors->all() as $error)
            <div class="alert alert-warning" role="alert">{{ $error }}</div>
        @endforeach        
    @endif
    <form class="text-center mt-3" action="{{ route('admin.auth') }}" method="post">
        @csrf
        <div class="form-floating">
            <input class="form-control" placeholder="login@email.com" type="email" name="email" id="email">
            <label for="email">Email</label>        
        </div>
        <div class="form-floating mt-2">            
            <input class="form-control" placeholder="password" type="password" name="password" id="password">
            <label for="password">Password</label>
        </div>
        <input class="btn btn-primary mt-2" type="submit" value="Entrar">
    </form>
</div>
@endsection