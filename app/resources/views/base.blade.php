<!DOCTYPE html>
<html lang="pt_BR">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2" crossorigin="anonymous"></script>
    <title>@yield("title", "No title")</title>
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
                            <li>
                                <a class="nav-link" href="{{ route('elector.dashboard') }}">Dashboard do eleitor</a>
                            </li>
                            <li>
                                <a class="nav-link" href="{{ route('elector.view-results-in-progress') }}">Resultado da pesquisa em progresso</a>
                            </li>
                            <li>
                                <a class="nav-link" href="{{ route('elector.view-results-closed') }}">Resultados de pesquisas encerradas</a>
                            </li>
                            <li>
                                <a class="nav-link" href="{{ route('elector.view-search-elector') }}">Ver meu voto</a>
                            </li>                        
                    </div>
                </div>
            </nav>            
        </header>
        <main class="pt-2 mt-2 mb-2">             
            @yield("content", "No content")                        
        </main>
        <footer class="position-relative">                
                <hr>
                <ul class="position-absolute">                                        
                    <li class="list-group-item text-center">VoteBr é um Dapp focado em pesquisas eleitorais para presidência da República Federativa do Brasil</li>                
                    <li class="list-group-item text-center"><span>Autor:</span><a href="https://alvarengacarlos.github.io/My-Profile/dist/" target="_blank">@AlvarengaCarlos</a></li>
                    <li class="list-group-item text-center"><span>Código fonte:</span><a href="https://github.com/alvarengacarlos/VoteBr.git" target="_blank">Github</a></li>
                    <li class="list-group-item text-center"><span>Direitos das imagens:</span><a href="https://www.flaticon.com/br/" target="_blank">Flaticon</a></li>
                    <li class="list-group-item text-center">Software licenciado</li>
                    <li class="list-group-item text-center">Copyrigth &copy;<a href="{{ route('admin.login') }}"><img class="admin-access-img" src="{{ asset('img/icon-cadeado-preto-fechado.png') }}" alt="ícone de cadeado de cor preta fechado" width="1.5%"></a></li>                    
                </ul>
        </footer>                
    </div>
</body>
</html>