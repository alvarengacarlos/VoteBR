<!DOCTYPE html>
<html lang="pt_BR">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield("title", "Base Elector")</title>
</head>
<body>
    <div class="container">
        <header>
            @yield("Header")
        </header>
        <main>
            @yield("content")
        </main>
        <footer>
            @yield("footer")
        </footer>        
    </div>
</body>
</html>