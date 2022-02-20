<!DOCTYPE html>
<html>
<body>
  <section class="main" id="s1">
    <div id = "sign-up" name = "sign-up">
        <h1>Registro</h1>

        <form id = "sign-up-form" name = "sign-up-form" enctype = "multipart/form-data" method = "post" action="SignUp.php">
            <p style="margin-bottom: 5px; margin-top: 5px">Cómo te llamas?</p>
            <input type="text" id="name" name="name" placeholder="Nombre" required>             
            <input type="text" id="surname1" name="surname1" placeholder="Apellido 1">
            <input type="text" id="surname2" name="surname2" placeholder="Apellido 2">
            <p style="margin-bottom: 5px; margin-top: 5px" >Correo electrónico</p>
            <input type="text" id="email" name="email" placeholder="Correo electrónico" required>
            <p style="margin-bottom: 5px; margin-top: 5px" >Numero de teléfono</p>
            <input type="tel" id="telf" name="telf" placeholder="Teléfono">
            <p style="margin-bottom: 5px; margin-top: 5px">Contraseña</p>
            <input type="password" id="password" name="password" placeholder="Contraseña" required>
            <input type="password" id="passwordRep" name="passwordRep" placeholder="Repite la contraseña" required>
            <p style="margin-top:10px">
            <label class="botoia" style="width: 30%;">
              <button type="submit" class="btn btn-primary" id="submit" name="submit" value="Registrarse" style="display: none;"></button>
              </i>Registrarse</label>
          </p>
	</form>
    </div>
    <?php	
    if($_SERVER['REQUEST_METHOD']=="POST") {
        include "DbConfig.php";
            
            try{
              $dsn = "mysql:host=$server;dbname=$db";
              $dbh = new PDO($dsn, $username, $password);
            } catch(PDOException $e){
              echo $e->getMessage();
            }
            
            $name = trim(preg_replace("/\s+/",' ',$_POST['name']));
            $surname1 = trim(preg_replace("/\s+/",' ',$_POST['surname1']));
            $surname2 = trim(preg_replace("/\s+/",' ',$_POST['surname2']));
            $email = trim(preg_replace("/\s+/",' ',$_POST['email']));
            $phonenumber = trim($_POST["telf"]);
            $password = $_POST['password'];
            $repPassword = $_POST['passwordRep'];
            $telf = trim(preg_replace("/\s+/",' ',$_POST['telf']));
	        
            if ($name === "" || $surname1 === "" || $surname2 === "" || $password === "" || $repPassword === "") {
                die ("Por favor, rellena todos los campos obligatorios");
            }

            if (!filter_var($email,
            FILTER_VALIDATE_EMAIL)
            ) {
              die('Email inválido');
            }

            if (!filter_var($name,
            FILTER_VALIDATE_REGEXP, 
            array('options' => array('regexp' => '/^[a-zA-Z]{2,}\s?([a-zA-Z]{2,}\s?)*$/')) )
            ) {
              die('Formato de nombre incorrecto, introduce tu nombre');
            }
            if (!filter_var($surname1,
            FILTER_VALIDATE_REGEXP, 
            array('options' => array('regexp' => '/^[a-zA-Z]{2,}\s?([a-zA-Z]{2,}\s?)*$/')) )
            ) {
              die('Formato de apellido incorrecto, introduce tu primer apellido');
            }
            if (!filter_var($surname2,
            FILTER_VALIDATE_REGEXP, 
            array('options' => array('regexp' => '/^[a-zA-Z]{2,}\s?([a-zA-Z]{2,}\s?)*$/')) )
            ) {
              die('Formato de apellido incorrecto, introduce tu segundo apellido');
            }

            if (!filter_var($password,
            FILTER_VALIDATE_REGEXP, 
            array('options' => array('regexp' => '/^(\S){8,}$/')) )
            ) {
              die('La contraseña tiene que tener por lo menos 8 caracteres');
            }

            if($password!==$repPassword){   
                die('Las contraseñas no coinciden');
            }

            $stmt = $dbh->prepare("SELECT email FROM users WHERE Users.email = ?");
            $stmt->bindParam(1,$email);
            $stmt->execute();
            
            if($stmt->rowCount() != 0){
                die("Lo sentimos, ya existe un usuario con ese correo electrónico");
            }
            $psw = crypt($password);
            $verificationnumber = rand(0,99999);

            $stmt = $dbh->prepare("INSERT INTO Users(name, surname1, surname2, email, psw, phonenumber) VALUES(?,?,?,?,?,?)");
            $stmt->bindParam(1,$name);
            $stmt->bindParam(2,$surname1);
            $stmt->bindParam(3,$surname2);
            $stmt->bindParam(4,$email);
            $stmt->bindParam(5,$psw);
            $stmt->bindParam(6,$phonenumber);

            $stmt->execute();

            $dbh = null;

            if (!isset($_SESSION)){
              session_start();
            }

            $_SESSION['email']=$email;
            header("Location: index.php");


            //echo "<script>if(window.confirm('Registrado correctamente. Consulta el correo electrónico para verificar la cuenta')){window.location.href='Layout.php'} </script>";
        }
    ?>
</section>
</body>
</html>
<?php



?>