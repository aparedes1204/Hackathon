<!-- Nabigazio Barra -->
<nav class="navbar navbar-expand-custom navbar-mainbg">
      <img class="d-none d-lg-block" src="../img/logo2.png" alt="logo" height="65" style="margin-left: 15px; position: absolute;">
            <img class="d-lg-none" src="../img/logo1.png" alt="logo" height="65" style="margin-left: 15px;">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <i class="fas fa-bars fa-fw fa-3x text-white"></i>
            </button>
            <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
               <ul class="navbar-nav mr-auto">
                  <div class="hori-selector">
                     <div class="left"></div>
                     <div class="right"></div>
                  </div>
                  <li class="nav-item active">
                     <a class="nav-link" href="javascript:void(0);" onclick="home();">
                     <i class="fa fa-home"></i>Home</a>
                  </li>
                  <li class="nav-item">
                     <a class="nav-link" href="javascript:void(0);" onclick="gipuzkoa();">
                     <i class="fas fa-film"></i>Gipuzkoa de cine</a>
                  </li>
                  <li class="nav-item">
                     <a class="nav-link" href="javascript:void(0);" onclick="info();">
                     <i class="fas fa-bookmark"></i>Info. práctica</a>
                  </li>
                  <?php
                     if (!isset($_SESSION)){
                           session_start();
                     }
                     if (isset($_SESSION["email"])){
                        echo "  <li class='nav-item'>
                        <a class='nav-link' href='javascript:void(0);' onclick='perfil()'>
                        <i class='fas fa-address-card'></i>".$_SESSION["email"]."</a>
                     </li> <li class='nav-item'>
                     <a class='nav-link' href='javascript:void(0);' onclick='logout()'>
                     <i class='fas fa-sign-out-alt'></i> Log Out</a>
                  </li>";
                     } else {

                  ?>
                  <li class="nav-item">
                     <a class="nav-link" href="javascript:void(0);" onclick="signup();">
                     <i class="fas fa-edit"></i>Registrarse</a>
                  </li>
                  <li class="nav-item">
                     <a class="nav-link" href="javascript:void(0);" onclick="login();">
                     <i class="fa fa-sign-in-alt"></i>Log In</a>
                  </li>
                  <?php
                     }
                  ?>
               </ul>
            </div>
         </nav>