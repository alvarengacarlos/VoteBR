<!DOCTYPE html>
<html lang="pt_BR">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield("title", "Base Admin")</title>
</head>
<body>
    <div class="container">
        <header>
            <p>Header</p>
            <a href="{{ route('welcome') }}">Página Inicial</a>
        </header>
        <main>
            @yield("content")
        </main>
        <footer>
            <p>Footer</p>
        </footer>        
    </div>
</body>
</html>