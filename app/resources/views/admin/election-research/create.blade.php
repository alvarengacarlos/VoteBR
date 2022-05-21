@extends("admin.base")

@section("title", "Criar nova pesquisa")

@section("content")
<div>
    <h1 class="text-center">Criar nova pesquisa eletoral</h1>
    @if ($errors->any())            
        @foreach ($errors->all() as $error)
            <div class="alert alert-warning" role="alert">{{ $error }}</div>
        @endforeach        
    @endif
    <form class="text-center" action="{{ route('admin.http-create-er') }}" method="post">
        @csrf
        <div class="form-floating">
            <input class="form-control" placeholder="2000" type="text" name="year" id="year" minlength="4" maxlength="4">
            <label for="year">Ano</label>        
        </div>
        <div class="form-floating mt-2">
            <input class="form-control" placeholder="01" type="text" name="month" id="month" minlength="2" maxlength="2">
            <label for="month">Mês</label>        
        </div>
        <input class="btn btn-primary mt-2" type="submit" value="Criar">
    </form>
</div>
@endsection