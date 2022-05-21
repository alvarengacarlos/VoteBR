@extends("admin.base")

@section("title", "Admin Dashboard")

@section("content")
<h4 class="text-center">Admin Dashboard</h4>
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