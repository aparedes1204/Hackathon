<!DOCTYPE html>
<html>
<head>
    <?php
        if (!isset($_SESSION)){
            session_start();
        }
        if (isset($_SESSION["email"])){
            header("Location: index.php");
        }
    ?>  
</head>
<body>
    <div id = "log-in" name = "log-in">
        <h1>Iniciar sesión</h1>

        <form id = "log-in-form" name = "log-in-form" method = "post" action="Login.php">
            <p>Email (*):<input type="text" id="email" name="email"><p>
            <p>Contraseña (*):<input type="password" id="password" name="password"><p>
            <input type="button" id="empty" name="empty" value="Vaciar" onclick="reset()">
            <input type="submit" id="submit" name="submit" value="Iniciar sesión">
        </form>
    </div>

    <?php

        if($_SERVER['REQUEST_METHOD']=="POST") {
            include "DbConfig.php";
            try {
                $dsn = "mysql:host=$server;dbname=$db";
                $dbh = new PDO($dsn, $username, $password);
              } catch (PDOException $e){
                $e->getMessage();
              }
            
            $email = trim($_POST['email']);
            $password = trim($_POST['password']);
            
            if ($email === "" || $password === "") {
                die ("Completa todos los campos obligatoriaos");
            }
            $stmt = $dbh->prepare("SELECT email FROM users WHERE users.email = ?");
            $stmt->bindParam(1, $email);
            $stmt->execute();

            if($stmt -> rowCount() == 0){
                die("Contraseña o usuario incorrectos");
            }


            $stmt = $dbh->prepare("SELECT psw FROM users WHERE users.email = ?");
            $stmt->setFetchMode(PDO::FETCH_ASSOC);
            $stmt->bindParam(1, $email);
            $stmt->execute();

            $strResult = $stmt->fetch()['psw'];
            if (!hash_equals($strResult, crypt($password, $strResult))){
                die("Contraseña o usuario incorrectos");
            }
            echo("todo bien");
        }
    ?>


  </section>
</body>
</html>