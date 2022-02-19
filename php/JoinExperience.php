<?php
    if ($_SERVER['REQUEST_METHOD'] == 'POST'){
        if (!isset($_SESSION)){
            session_start();
        }
        include "DbConfig.php";
        $experienceID = $_POST['experienceID'];
        $email = $_SESSION['email'];


        try{
            $dsn = "mysql:host=$server;dbname=$db";
            $dbh = new PDO($dsn, $username, $password);
        } catch(PDOException $e){
            $response = [
                'correct' => false
            ];
            echo json_encode($response);
          }
        
          $stmt = $dbh->prepare("SELECT ID FROM users WHERE users.email = ?");
          $stmt->bindParam(1,$email);
          $stmt->setFetchMode(PDO::FETCH_ASSOC);
          $stmt->execute();
          
          $usrID = $stmt->fetch()['ID'];
          $date = date('Y-m-d H:i:s');

          $stmt = $dbh->prepare("INSERT INTO user_experience(userID, experienceID, date, rating) VALUES(?,?,?,?)");
          $stmt->bindParam(1,$usrID);
          $stmt->bindParam(2,$experienceID);
          $stmt->bindParam(3,$date);
          $stmt->bindParam(4,$rating);

          $stmt->execute();
          $response = [
            'correct' => true
            ];
            echo json_encode($response);

    } else {
        header('Location: index.php');
    }






?>