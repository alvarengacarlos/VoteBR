@extends("admin.base")

@section("title", "Dashboard")

@section("content")
<h1>Admin Dashboard</h1>
<div>
    <h2>Adminstrar Pesquisas eleitorais:</h2>
    <a href="{{ route('admin.view-create-er') }}" target="_blank">Criar</a>
    <a href="{{ route('admin.view-erws') }}" target="_blank">Não inicadas</a>
    <a href="{{ route('admin.view-erip') }}" target="_blank">Em progresso</a>
    <a href="{{ route('admin.view-erc') }}" target="_blank">Encerradas</a>
</div>

@endsection