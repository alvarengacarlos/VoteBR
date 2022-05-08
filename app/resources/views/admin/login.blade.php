@extends("admin.base")

@section("title", "Login")

@section("content")
    <h2>Admin Login</h2>
    @if ($errors->any())
        <div class="alert alert-danger">
            <ul>
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif
    <form action="{{ route('admin.auth') }}" method="post">
        @csrf
        <label for="email">Email:</label>
        <input type="email" name="email" id="email">
        <label for="password">Password</label>
        <input type="password" name="password" id="password">
        <input type="submit" value="entrar">
    </form>
@endsection