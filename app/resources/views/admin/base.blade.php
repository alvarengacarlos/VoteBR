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
            <ul>
                <li><a href="{{ route('welcome') }}">Página Inicial</a></li>
                <li><a href="{{ route('admin.dashboard') }}">Admin Dashboard</a></li>
                <li><a href="{{ route('admin.view-create-er') }}">Criar Nova Pesquisa</a></li>
                <li><a href="{{ route('admin.view-erws') }}">Pesquisas não Inicadas</a></li>
                <li><a href="{{ route('admin.view-erip') }}">Pesquisas em Progresso</a></li>
                <li><a href="{{ route('admin.view-erc') }}">Pesquisas Encerradas</a></li>                
            </ul>            
        </header>
        <main>
            @yield("content")
        </main>
        <footer>
            
        </footer>        
    </div>
</body>
</html>