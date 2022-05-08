@extends("admin.base")

@section("title", "Dashboard")

@section("content")
<h1>Admin Dashboard</h1>

<div>
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

    <form action="{{ route('admin.create-election-research') }}" method="post">
        @csrf
        <label for="year">Year</label>
        <input type="text" name="year" id="year" minlength="4" maxlength="4">
        <label for="month">Month</label>
        <input type="text" name="month" id="month" minlength="2" maxlength="2">
        <input type="submit" value="Criar">
    </form>

    <h4>Inserir candidato</h4>
    <form action="{{ route('admin.insert-candidate') }}" method="post">
        @csrf
        <label for="nameOfCandidate">Nome do candidato</label>
        <input type="text" name="nameOfCandidate" id="nameOfCandidate">
        <label for="numberOfCandidate">Número do candidato</label>
        <input type="text" name="numberOfCandidate" id="numberOfCandidate" minlength="2" maxlength="2">
        <input type="submit" value="Inserir">
    </form>

    <h4>Remover candidato</h4>
    <form action="{{ route('admin.remove-candidate') }}" method="post">
        @csrf
        @method("DELETE")
        <label for="numberOfCandidate">Número do candidato</label>
        <input type="text" name="numberOfCandidate" id="numberOfCandidate" minlength="2" maxlength="2">
        <input type="submit" value="Inserir">
    </form>
    
    <form action="{{ route('admin.begin-collecting-votes') }}" method="post">
        @csrf        
        <input type="submit" value="Iniciar coleta de votos">
    </form>    
</div>

@endsection