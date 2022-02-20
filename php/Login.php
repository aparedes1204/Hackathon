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

        <form id = "log-in-form" class="align-items-center" name = "log-in-form" method = "post" action="Login.php">

            <p>Email (*):<input type="text" id="email" name="email" style="margin-left:50px" required><p>
            <p>Contraseña (*):<input type="password" id="password" name="password" style="margin-left:10px"><p>

            <label class="botoia" style="width: 40%;">
              <button type="submit" class="btn btn-primary" id="submit" name="submit" value="Iniciar sesión" style="display: none;"></button>
              </i>Iniciar sesión</label></br>

            <label class="botoia" style="width: 30%;">
              <button type="button" class="btn btn-primary" id="empty" name="empty" value="Vaciar" onclick="reset()" style="display: none;"></button>
              </i>Vaciar</label>

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
            if (!isset($_SESSION)){
                session_start();
            }
            $_SESSION['email'] = $email;
            header("Location: index.php");
        }
    ?>


  </section>
</body>
</html>