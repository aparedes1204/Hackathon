<!DOCTYPE html>
<html>
<link rel="stylesheet" href="../css/style.css">
   <head>  
   </head>
   <body>
      <!-- Navbar -->
      <!-- Flex sekzioa -->
      <div class="d-flex flex-column min-vh-100">
         <main class="flex-fill">

            <div class="content" id="home" style="transition: 1s; ">
                Felicidades, 
                <?php
                include "DbConfig.php";
                       try{
                        $dsn = "mysql:host=$server;dbname=$db";
                        $dbh = new PDO($dsn, $username, $password);
                    } catch(PDOException $e){
                        echo $e->getMessage();
                    }
                    
                    if(!isset($_SESSION)){
                        session_start();
                    }

                    $email = $_SESSION['email'];

                    $stmt = $dbh->prepare("SELECT name FROM users WHERE users.email = ?");
                    $stmt->bindParam(1,$email);
                    $stmt->setFetchMode(PDO::FETCH_ASSOC);
                    $stmt->execute();

                    echo $stmt->fetch()['name'];
                ?>
                has completado la actividad: 
                <?php
                include "DbConfig.php";
                       try{
                        $dsn = "mysql:host=$server;dbname=$db";
                        $dbh = new PDO($dsn, $username, $password);
                    } catch(PDOException $e){
                        echo $e->getMessage();
                    }
                    
                    $activityID = $_GET['activityID'];

                    $stmt = $dbh->prepare("SELECT name FROM activity WHERE activity.ID = ?");
                    $stmt->bindParam(1,$activityID);
                    $stmt->setFetchMode(PDO::FETCH_ASSOC);
                    $stmt->execute();

                    echo $stmt->fetch()['name'];
                ?>

            </div>

        </main>
      </div>
   </body>
</html>


<script
  src="https://code.jquery.com/jquery-3.6.0.js"
  integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk="
  crossorigin="anonymous"></script>

<?php

    if (!isset($_SESSION)){
        session_start();
    }   

    include "DbConfig.php";
    try{
        $dsn = "mysql:host=$server;dbname=$db";
        $dbh = new PDO($dsn, $username, $password);
    } catch(PDOException $e){
        echo $e->getMessage();
    }


    $activityID = $_GET['activityID'];
    //echo($activityID);
    $email = $_SESSION['email'];

    $stmt = $dbh->prepare("SELECT ID FROM activity WHERE activity.ID = ?");
    $stmt->bindParam(1,$activityID);
    $stmt->execute();

    if($stmt -> rowCount() != 0){
        $stmt = $dbh->prepare("SELECT ID FROM users WHERE users.email = ?");
        $stmt->bindParam(1,$email);
        $stmt->setFetchMode(PDO::FETCH_ASSOC);
        $stmt->execute();
        
        $usrID = $stmt->fetch()['ID'];

       
        $stmt = $dbh->prepare("INSERT INTO user_activity (userID, activityID) VALUES (?,?)");
        $stmt->bindParam(1,$usrID);
        $stmt->bindParam(2,$activityID);
        $stmt->execute() || die();

        
        $stmt = $dbh->prepare("SELECT experienceID FROM activity WHERE ID = ?");
        $stmt->bindParam(1,$activityID);
        $stmt->setFetchMode(PDO::FETCH_ASSOC);
        $stmt->execute();
        
        $experienceID = $stmt->fetch()['experienceID'];
        

        $stmt = $dbh->prepare("SELECT completedactivities FROM user_experience WHERE user_experience.ID = (SELECT MAX(ID) FROM user_experience WHERE user_experience.userID = ? AND user_experience.experienceID = ?)");
        $stmt->bindParam(1,$usrID);
        $stmt->bindParam(2,$experienceID);
        $stmt->setFetchMode(PDO::FETCH_ASSOC);
        $stmt->execute();
        $completedActivities = $stmt->fetch()['completedactivities'] + 1;
        
        $stmt = $dbh->prepare("SELECT totalactivities FROM experience WHERE experience.ID = (SELECT experienceID FROM activity WHERE activity.ID = ?)");
        $stmt->bindParam(1,$activityID);
        $stmt->setFetchMode(PDO::FETCH_ASSOC);
        $stmt->execute();
        
        $totalActivities = $stmt->fetch()['totalactivities'];
        
        if($completedActivities == $totalActivities){
            $stmt = $dbh->prepare("DELETE FROM user_activity WHERE user_activity.userID = ?");
            $stmt->bindParam(1,$usrID);
            $stmt->execute();
            
            $date = date('Y-m-d H:i:s');

            $stmt = $dbh->prepare("UPDATE user_experience SET user_experience.endingdate = ? WHERE user_experience.ID = (SELECT MAX(ID) FROM user_experience WHERE user_experience.userID = ? AND user_experience.experienceID = ?)");
            $stmt->bindParam(1,$date);
            $stmt->bindParam(2,$usrID);
            $stmt->bindParam(3,$experienceID);
            $stmt->execute();
        }
        if ($completedActivities <= $totalActivities){
            $stmt = $dbh->prepare("UPDATE user_experience SET completedactivities = ? WHERE userID=? AND experienceID=? AND completedactivities < (SELECT totalactivities FROM experience WHERE experience.ID = ?)");
            $stmt->bindParam(1,$completedActivities);
            $stmt->bindParam(2,$usrID);
            $stmt->bindParam(3,$experienceID);
            $stmt->bindParam(4,$experienceID);
            $stmt->execute();
        }
    }

?>