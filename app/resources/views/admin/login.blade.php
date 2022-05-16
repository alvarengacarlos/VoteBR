@extends("base")

@section("title", "Login Admin")

@section("content")
<div>
    <h2>Admin Login</h2>
    @if ($errors->any())        
    <ul>
        @foreach ($errors->all() as $error)
            <li>{{ $error }}</li>
        @endforeach
    </ul>        
    @endif
    <form action="{{ route('admin.auth') }}" method="post">
        @csrf
        <label for="email">Email:</label>
        <input type="email" name="email" id="email">
        <label for="password">Password</label>
        <input type="password" name="password" id="password">
        <input type="submit" value="entrar">
    </form>
</div>
@endsection