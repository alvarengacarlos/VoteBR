@extends("base")

@section("title", "Login eleitor")

@section("content")
<div>
    <h4 class="text-center">Login eleitor</h4>
    @if ($errors->any())            
        @foreach ($errors->all() as $error)
            <div class="alert alert-warning" role="alert">{{ $error }}</div>
        @endforeach        
    @endif
    <div class="text-center">
        <form action="{{ route('elector.auth') }}" method="post">
            @csrf        
            <input class="mt-2 btn btn-primary" type="submit" value="Entrar">
        </form>
    </div>
@endsection()
</div>