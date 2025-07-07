# Full-Stack---html-css-Php-Mysql
Technologies Used:- HTML, CSS, PHP, MySQL


Aim:
To build a dynamic photo gallery web application that allows users to upload, view, and manage images using a user-friendly interface.


Problem Statement:
		Traditional photo storage methods are static and don’t offer much flexibility for online viewing or organizing. There's a need for a simple yet elegant web-based gallery that supports image uploads, storage, and categorized viewing.


Technology Description:

PHP (Hypertext Preprocessor):
•	PHP is a powerful server-side scripting language designed for web development.
•	It is used in this project to:
o	Handle form submissions (upload, delete, update).
o	Manage file uploads securely (e.g., checking file type and size).
o	Connect and interact with the MySQL database using SQL queries.
o	Generate dynamic content – like displaying images from the database.
•	PHP enables backend logic that runs on the server before the web page is sent to the user's browser.

 MySQL:
•	MySQL is a popular relational database management system (RDBMS).
•	It is used to:
o	Store metadata about the uploaded images (e.g., title, filename, upload date).
o	Provide a structured and reliable way to retrieve, update, and delete records.
o	Maintain data consistency and integrity.
•	It integrates seamlessly with PHP through SQL queries.

 XAMPP:
•	XAMPP is an open-source, cross-platform web server solution stack package developed by Apache Friends.
•	It includes:
o	Apache – the web server that runs the PHP scripts.
o	MySQL/MariaDB – the database engine.
o	PHP – the language interpreter.
•	XAMPP is used to:
o	Run the application locally on a developer’s machine.
o	Simulate a real server environment for development and testing.
•	It provides a simple control panel to manage services like Apache and MySQL.

 HTML (HyperText Markup Language):
•	HTML is used to structure the frontend of the application.
•	It creates the layout of forms, buttons, and image display sections.
•	All form inputs for uploading, editing, and deleting images are built using HTML.

 CSS (Cascading Style Sheets):
•	CSS is used to style the application, making the gallery visually appealing.
•	It is used for:
o	Designing the image grid layout.
o	Enhancing the look and feel of buttons, forms, and text.
o	Making the UI responsive and attractive.

  SOLUTION FOR THE PROBLEM:

To overcome the difficulties of organizing and displaying photos efficiently, this project provides a simple yet powerful Photo Gallery Web Application built using PHP, MySQL, and XAMPP.
              1. Image Upload and Storage: Users can easily upload images which are securely stored in a dedicated folder, while the image metadata like title and upload date is saved in a MySQL database.
             2. Dynamic Gallery Display: The images are dynamically fetched and displayed in a user-friendly gallery layout, making it visually appealing and easily accessible without manual updates.
             3. Localhost-based Solution: By using XAMPP, the system runs entirely on a local server, making it cost-effective, fast, and independent of any third-party platform, while also being easily scalable for future features like user login or album categorization.

SAMPLE CODE:

Login.php:

<?php require_once('config.php') ?>
<!DOCTYPE html>
<html lang="en" class="" style="height: auto;">
 <?php require_once('inc/header.php') ?>
<body class="hold-transition login-page ">
  <script>
    start_loader()
  </script>
  <div class="container mb-4">
    <h2 class="text-center"><?php echo $_settings->info('name') ?></h2>
  </div>
<div class="login-box">
  <!-- /.login-logo -->
  <div class="card card-outline card-primary">
    <div class="card-header text-center">
      <a href="./" class="h1"><b>Login</b></a>
    </div>
    <div class="card-body">
      <form id="login-frm" action="" method="post">
        <div class="input-group mb-3">
          <input type="text" class="form-control" name="username" placeholder="Username">
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-user"></span>
            </div>
          </div>
        </div>
        <div class="input-group mb-3">
          <input type="password" class="form-control" name="password" placeholder="Password">
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-lock"></span>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-8">
            <a href="javascript:void(0)" id="create_account">Create Account</a>
          </div>
          <!-- /.col -->
          <div class="col-4">
            <button type="submit" class="btn btn-primary btn-block">Sign In</button>
          </div>
          <!-- /.col -->
        </div>
      </form>
      <!-- /.social-auth-links -->

      <!-- <p class="mb-1">
        <a href="forgot-password.html">I forgot my password</a>
      </p> -->
      
    </div>
    <!-- /.card-body -->
  </div>
  <!-- /.card -->
</div>
<!-- /.login-box -->

<!-- jQuery -->
<script src="plugins/jquery/jquery.min.js"></script>
<!-- Bootstrap 4 -->
<script src="plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
<!-- AdminLTE App -->
<script src="dist/js/adminlte.min.js"></script>

<script>
  window.uni_modal = function($title = '' , $url='',$size=""){
        start_loader()
        $.ajax({
            url:$url,
            error:err=>{
                console.log()
                alert("An error occured")
            },
            success:function(resp){
                if(resp){
                    $('#uni_modal .modal-title').html($title)
                    $('#uni_modal .modal-body').html(resp)
                    if($size != ''){
                        $('#uni_modal .modal-dialog').addClass($size+'  modal-dialog-centered')
                    }else{
                        $('#uni_modal .modal-dialog').removeAttr("class").addClass("modal-dialog modal-md modal-dialog-centered")
                    }
                    $('#uni_modal').modal({
                      show:true,
                      backdrop:'static',
                      keyboard:false,
                      focus:true
                    })
                    end_loader()
                }
            }
        })
    }
  $(document).ready(function(){
    end_loader();
    $('#create_account').click(function(){
      uni_modal("Create Account","create_account.php")
    })
  })
</script>
<div class="modal fade" id="uni_modal" role='dialog'>
    <div class="modal-dialog modal-md modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
        <h5 class="modal-title"></h5>
      </div>
      <div class="modal-body">
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" id='submit' onclick="$('#uni_modal form').submit()">Save</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
      </div>
      </div>
    </div>
  </div>
</body>
</html>

Index.php:
<?php 
$user = $conn->query("SELECT * FROM users where id ='".$_settings->userdata('id')."'");
foreach($user->fetch_array() as $k =>$v){
    $meta[$k] = $v;
}
?>
<?php if($_settings->chk_flashdata('success')): ?>
<script>
    alert_toast("<?php echo $_settings->flashdata('success') ?>",'success')
</script>
<?php endif;?>
<div class="card card-outline card-primary">
    <div class="card-body">
        <div class="container-fluid">
            <div id="msg"></div>
            <form action="" id="manage-user">   
                <input type="hidden" name="id" value="<?php echo $_settings->userdata('id') ?>">
                <div class="form-group">
                    <label for="name">First Name</label>
                    <input type="text" name="firstname" id="firstname" class="form-control" value="<?php echo isset($meta['firstname']) ? $meta['firstname']: '' ?>" required>
                </div>
                <div class="form-group">
                    <label for="name">Last Name</label>
                    <input type="text" name="lastname" id="lastname" class="form-control" value="<?php echo isset($meta['lastname']) ? $meta['lastname']: '' ?>" required>
                </div>
                <div class="form-group">
                    <label for="username">Username</label>
                    <input type="text" name="username" id="username" class="form-control" value="<?php echo isset($meta['username']) ? $meta['username']: '' ?>" required  autocomplete="off">
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" name="password" id="password" class="form-control" value="" autocomplete="off">
                    <small><i>Leave this blank if you dont want to change the password.</i></small>
                </div>
                <div class="form-group">
                    <label for="" class="control-label">Avatar</label>
                    <div class="custom-file">
                      <input type="file" class="custom-file-input rounded-circle" id="customFile" name="img" onchange="displayImg(this,$(this))">
                      <label class="custom-file-label" for="customFile">Choose file</label>
                    </div>
                </div>
                <div class="form-group d-flex justify-content-center">
                    <img src="<?php echo validate_image(isset($meta['avatar']) ? $meta['avatar'] :'') ?>" alt="" id="cimg" class="img-fluid img-thumbnail">
                </div>
            </form>
        </div>
    </div>
    <div class="card-footer">
            <div class="col-md-12">
                <div class="row">
                    <button class="btn btn-sm btn-primary" form="manage-user">Update</button>
                </div>
            </div>
        </div>
</div>
<style>
    img#cimg{
        height: 15vh;
        width: 15vh;
        object-fit: cover;
        border-radius: 100% 100%;
    }
</style>
<script>
    function displayImg(input,_this) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#cimg').attr('src', e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        }
    }
    $('#manage-user').submit(function(e){
        e.preventDefault();
        start_loader()
        $.ajax({
            url:_base_url_+'classes/Users.php?f=save',
            data: new FormData($(this)[0]),
            cache: false,
            contentType: false,
            processData: false,
            method: 'POST',
            type: 'POST',
            success:function(resp){
                if(resp ==1){
                    location.reload()
                }else{
                    $('#msg').html('<div class="alert alert-danger">Username already exist</div>')
                    end_loader()
                }
            }
        })
    })

</script>
Viewimg.php:
<?php
require_once('../config.php');
if(isset($_GET['id']) && $_GET['id'] > 0){
    $qry = $conn->query("SELECT * from `images` where id = '{$_GET['id']}' ");
    if($qry->num_rows > 0){
        foreach($qry->fetch_assoc() as $k => $v){
            $$k=$v;
        }
    }
}
?>
<style>
    #uni_modal .modal-header,#uni_modal .modal-footer{
        display:none !important;
    }
</style>
<div class="container-fluid">
    <div class="w-100 d-flex justify-content-between">
        <h4><b><?php echo $original_name ?></b></h4>
        <a href="#" data-dismiss='modal' class="text-dark"><i class="fa fa-times"></i></a>
    </div>
</div>
<div class="container-fluid bg-dark" >
    <div id="img-holder" class='w-100'>
        <img src="<?php echo validate_image($path_name) ?>" alt="img" loading="lazy" class="w-100 view-img" id="view-img">
    </div>
</div>
Rename.php:
<?php
require_once('../config.php');
if(isset($_GET['id']) && $_GET['id'] > 0){
    $qry = $conn->query("SELECT * from `images` where id = '{$_GET['id']}' ");
    if($qry->num_rows > 0){
        foreach($qry->fetch_assoc() as $k => $v){
            $$k=$v;
        }
    }
}
?>
<div class="container-fluid">
    <form action="" id="image-form">
        <input type="hidden" name ="id" value="<?php echo isset($id) ? $id : '' ?>">
        <input type="hidden" name ="ext" value=".<?php echo isset($original_name) ? strrev(explode('.',strrev($original_name),-1)[0]) : '' ?>">
        <div class="form-group">
            <label for="original_name" class="control-label">Image Name</label>
            <div class="input-group">
            <input name="original_name" autofocusid="" class="form-control form no-resize" value="<?php echo isset($original_name) ? explode('.',$original_name,-1)[0] : ''; ?>" />
            <div class="input-group-append">
                <span class="input-group-text">.<?php echo isset($original_name) ? strrev(explode('.',strrev($original_name),-1)[0]) : ''; ?></span>
            </div>
            </div>
        </div>
        </div>
    </form>
</div>
<script>
    $(document).ready(function(){
        $('#image-form').submit(function(e){
            e.preventDefault();
            var _this = $(this)
             $('.err-msg').remove();
            start_loader();
            $.ajax({
                url:_base_url_+"classes/Master.php?f=rename_image",
                data: new FormData($(this)[0]),
                cache: false,
                contentType: false,
                processData: false,
                method: 'POST',
                type: 'POST',
                dataType: 'json',
                error:err=>{
                    console.log(err)
                    alert_toast("An error occured",'error');
                    end_loader();
                },
                success:function(resp){
                    if(typeof resp =='object' && resp.status == 'success'){
                        location.reload()
                    }else if(resp.status == 'failed' && !!resp.msg){
                        var el = $('<div>')
                            el.addClass("alert alert-danger err-msg").text(resp.msg)
                            _this.prepend(el)
                            el.show('slow')
                            $("html, body").animate({ scrollTop: _this.closest('.card').offset().top }, "fast");
                            end_loader()
                    }else{
                        alert_toast("An error occured",'error');
                        end_loader();
                        console.log(resp)
                    }
                }
            })
        })

    })
</script>
Managealbum.php:
<?php
require_once('../config.php');
if(isset($_GET['id']) && $_GET['id'] > 0){
    $qry = $conn->query("SELECT * from `album_list` where id = '{$_GET['id']}' ");
    if($qry->num_rows > 0){
        foreach($qry->fetch_assoc() as $k => $v){
            $$k=$v;
        }
    }
}
?>
<div class="container-fluid">
    <form action="" id="album-form">
        <input type="hidden" name ="id" value="<?php echo isset($id) ? $id : '' ?>">
        <input type="hidden" name ="user_id" value="<?php echo $_settings->userdata('id') ?>">
        <div class="form-group">
            <label for="name" class="control-label">Album Name</label>
            <input name="name" id="" autofocus class="form-control form no-resize" value="<?php echo isset($name) ? $name : ''; ?>" />
        </div>
        </div>
    </form>
</div>
<script>
    $(document).ready(function(){
        $('#album-form').submit(function(e){
            e.preventDefault();
            var _this = $(this)
             $('.err-msg').remove();
            start_loader();
            $.ajax({
                url:_base_url_+"classes/Master.php?f=save_album",
                data: new FormData($(this)[0]),
                cache: false,
                contentType: false,
                processData: false,
                method: 'POST',
                type: 'POST',
                dataType: 'json',
                error:err=>{
                    console.log(err)
                    alert_toast("An error occured",'error');
                    end_loader();
                },
                success:function(resp){
                    if(typeof resp =='object' && resp.status == 'success'){
                        location.reload()
                    }else if(resp.status == 'failed' && !!resp.msg){
                        var el = $('<div>')
                            el.addClass("alert alert-danger err-msg").text(resp.msg)
                            _this.prepend(el)
                            el.show('slow')
                            $("html, body").animate({ scrollTop: _this.closest('.card').offset().top }, "fast");
                            end_loader()
                    }else{
                        alert_toast("An error occured",'error');
                        end_loader();
                        console.log(resp)
                    }
                }
            })
        })

    })
</script>
<?php
require_once('../config.php');
if(isset($_GET['id']) && $_GET['id'] > 0){
    $qry = $conn->query("SELECT * from `images` where id = '{$_GET['id']}' ");
    if($qry->num_rows > 0){
        foreach($qry->fetch_assoc() as $k => $v){
            $$k=$v;
        }
    }
}
?>
<div class="container-fluid">
    <form action="" id="image-form">
        <input type="hidden" name ="id" value="<?php echo isset($id) ? $id : '' ?>">
        <input type="hidden" name ="album_id" value="<?php echo $_GET['album_id'] ?>">
        <input type="hidden" name ="user_id" value="<?php echo $_settings->userdata('id') ?>">
        <div class="form-group">
            <label for="images" class="control-label">Upload</label>
            <input name="images[]" id="images" type="file" multiple class="form-control" accept="image/*" />
        </div>
        </div>
    </form>
</div>
<script>
    $(document).ready(function(){
        $('#image-form').submit(function(e){
            e.preventDefault();
            var _this = $(this)
             $('.err-msg').remove();
            start_loader();
            $.ajax({
                url:_base_url_+"classes/Master.php?f=save_image",
                data: new FormData($(this)[0]),
                cache: false,
                contentType: false,
                processData: false,
                method: 'POST',
                type: 'POST',
                dataType: 'json',
                error:err=>{
                    console.log(err)
                    alert_toast("An error occured",'error');
                    end_loader();
                },
                success:function(resp){
                    if(typeof resp =='object' && resp.status == 'success'){
                        location.reload()
                    }else if(resp.status == 'failed' && !!resp.msg){
                        var el = $('<div>')
                            el.addClass("alert alert-danger err-msg").text(resp.msg)
                            _this.prepend(el)
                            el.show('slow')
                            $("html, body").animate({ scrollTop: _this.closest('.card').offset().top }, "fast");
                            end_loader()
                    }else{
                        alert_toast("An error occured",'error');
                        end_loader();
                        console.log(resp)
                    }
                }
            })
        })

    })
</script>



 

 

 
 

 
 


 

 
 





