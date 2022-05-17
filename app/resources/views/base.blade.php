<!DOCTYPE html>
<html lang="pt_BR">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield("title", "No title")</title>
</head>
<body>
    <div class="container">
        <header>
            <nav>
                <ul>
                    <li><a href="{{ route('welcome') }}">Página Inicial</a></li>
                    <li><a href="{{ route('elector.dashboard') }}">Dashboard do eleitor</a></li>
                    <li><a href="{{ route('elector.view-results-in-progress') }}">Resultado da pesquisa em progresso</a></li> 
                    <li><a href="{{ route('elector.view-results-closed') }}">Resultados de pesquisas encerradas</a></li>                 
                    <li><a href="{{ route('elector.view-search-elector') }}">Ver meu voto</a></li>                
                </ul>
            </nav>
        </header>
        <main>
            @yield("content", "No content")
        </main>
        <footer>            
            <ul>
                <li><p>Autor: @AlvarengaCarlos</p></li>
                <li><a href="https://alvarengacarlos.github.io/My-Profile/dist/" target="_blank">Mais informações sobre mim</a></li>
                <li><a href="https://github.com/alvarengacarlos/VoteBr.git" target="_blank">Código fonte</a></li>
                <li><span>Direitos das imagens:</span> <a href="https://www.flaticon.com/br/" target="_blank">Flaticon</a></li>                
                <li><p>Software licenciado</p></li>
                <li><a href="{{ route('admin.login') }}" target="_blank"><figure><img src="{{ asset('img/icon-cadeado-preto-fechado.png') }}" alt="ícone de cadeado de cor preta fechado" width="20"></a></figure></li>
            </ul>           
        </footer>        
    </div>
</body>
</html>