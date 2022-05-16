@extends("admin.base")

@section("title", "Criar nova pesquisa")

@section("content")
<div>
<h1>Criar nova pesquisa eletoral</h1>
    @if ($errors->any())    
        <ul>
            @foreach ($errors->all() as $error)
            <li>{{ $error }}</li>
            @endforeach
        </ul>    
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