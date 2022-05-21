<!DOCTYPE html>
<html lang="pt_BR">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2" crossorigin="anonymous"></script>
    <title>@yield("title", "Base Admin")</title>
</head>
<body>
    <div class="container">
        <header class="sticky-top">
            <nav class="navbar navbar-expand-lg bg-light">
                <div class="container-fluid">
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link" href="{{ route('welcome') }}">Página Inicial</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="{{ route('admin.dashboard') }}">Admin Dashboard</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="{{ route('admin.view-create-er') }}">Criar Nova Pesquisa</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="{{ route('admin.view-erws') }}">Pesquisas não Inicadas</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="{{ route('admin.view-erip') }}">Pesquisas em Progresso</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="{{ route('admin.view-erc') }}">Pesquisas Encerradas</a>
                            </li>                
                        </ul>
                    </div>
                </div>
            </nav>            
        </header>
        <main class="pt-2 mt-2 mb-2">
            @yield("content")
        </main>
        <footer class="position-relative">
            <hr>    
            <ul class="position-absolute">                                
                <li class="list-group-item text-center">VoteBr é um Dapp focado em pesquisas eleitorais para presidência da República Federativa do Brasil</li>                
                <li class="list-group-item text-center"><span>Autor:</span><a href="https://alvarengacarlos.github.io/My-Profile/dist/" target="_blank">@AlvarengaCarlos</a></li>
                <li class="list-group-item text-center"><a href="https://github.com/alvarengacarlos/VoteBr.git" target="_blank">Código fonte</a></li>
                <li class="list-group-item text-center"><span>Direitos das imagens:</span><a href="https://www.flaticon.com/br/" target="_blank">Flaticon</a></li>
                <li class="list-group-item text-center">Software licenciado</li>
                <li class="list-group-item text-center">Copyrigth &copy;<a href="{{ route('admin.login') }}"></li>                    
            </ul>
        </footer>        
    </div>
</body>
</html>