@extends("admin.base")

@section("title", "Dashboard")

@section("content")
<h1>Admin Dashboard</h1>

<div>
    <h2>Adminstrar Pesquisas eleitorais:</h2>    
    <h4>Criar pesquisa eleitoral</h4>
    @if ($errors->any())
    <div class="alert alert-danger">
        <ul>
            @foreach ($errors->all() as $error)
            <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
    @endif
    <form action="{{ route('admin.http-create-er') }}" method="post">
        @csrf
        <label for="year">Year</label>
        <input type="text" name="year" id="year" minlength="4" maxlength="4">
        <label for="month">Month</label>
        <input type="text" name="month" id="month" minlength="2" maxlength="2">
        <input type="submit" value="Criar">
    </form>
</div>

@endsection