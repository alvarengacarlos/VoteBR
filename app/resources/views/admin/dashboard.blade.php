@extends("admin.base")

@section("title", "Admin Dashboard")

@section("content")
<h1>Admin Dashboard</h1>
<div>    
    @if ($errors->any())
    <ul>
        @foreach ($errors->all() as $error)
        <li>{{ $error }}</li>
        @endforeach
    </ul>
    @endif    
</div>
@endsection