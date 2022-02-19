<?php
        if (!isset($_SESSION)){
            session_start();
        }
        if (isset($_SESSION["email"])){
            echo "        <a href='SignUp.php'>
            <input type='button' value='Regístrate en la experiencia' />
        </a>";
        } else {
            echo "        <a href='index.php'>
            <input type='button' value='Regístrate en la experiencia' />
        </a>";
        }

?>