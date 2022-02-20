<!DOCTYPE html>
<html>
   <!-- Load headers -->
   <head>  
      <?php include '../html/Head.html'?>
   </head>
   <body>
      <!-- Navbar -->
      <!-- Flex sekzioa -->
      <div class="d-flex flex-column min-vh-100">
      <?php include '../php/Navbar.php'?>
         <!-- Barnealdea -->
         <main class="flex-fill">

            <div class="content" id="home" style="transition: 1s; ">Hasiera</div>
            <div class="content" id="login" style="transition: 1s; margin-top: -1000px; ">Login</div>
            <div class="content" id="signup" style="transition: 1s; margin-top: -1000px; ">Signup</div>
            <div class="content" id="gipuzkoa" style="transition: 1s; margin-top: -1000px; ">Gipuzkoa</div>
            <div class="content" id="akelarre" style="transition: 1s; margin-top: -1000px; ">Akelarre</div>
            <div class="content" id="info" style="transition: 1s; margin-top: -1000px; ">Info</div>
            <div class="content" id="maria" style="transition: 1s; margin-top: -1000px; ">Maria</div>

        </main>
      </div>
   </body>
</html>

