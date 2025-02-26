<?php
$this->title = 'Miya commerce';

use yii\widgets\ActiveForm;
use yii\helpers\ArrayHelper;
use yii\widgets\Pjax;
use yii\helpers\Html;

use app\models\Theme;
$Themelist = Theme::find()->where(['is_delete'=>0])->orderBy('id')->asArray()->one();

?>	
<!doctype html>
<html lang="en">

    <head>
        
        <meta charset="utf-8">
        <title>Miya commerce</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta content="Miya commerce" name="description">
     
        <!-- App favicon -->
        <link rel="shortcut icon" href="<?php echo Yii::$app->request->baseUrl .'/source/logo-files/'. $Themelist['favicon']?>">

        <!-- Bootstrap Css -->
        <link href="<?php echo Yii::$app->request->baseUrl .'/source/css/bootstrap.min.css'?>" id="bootstrap-style" rel="stylesheet" type="text/css">
        <!-- Icons Css -->
        <link href="<?php echo Yii::$app->request->baseUrl .'/source/css/icons.min.css'?>" rel="stylesheet" type="text/css">
        <!-- App Css-->
        <link href="<?php echo Yii::$app->request->baseUrl .'/source/css/app.min.css'?>" id="app-style" rel="stylesheet" type="text/css">
        
        <?= $this->render('styles.php') ?>

    </head>
	
	<body>
	
		<!-- <div class="home-btn d-none d-sm-block">
            <a href="index" class="text-dark"><i class="fas fa-home h2"></i></a>
        </div> -->
		
        <div class="account-pages my-5 pt-sm-5">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-md-8 col-lg-6 col-xl-5">
                        <div class="card overflow-hidden">
                            <div class="header_bg">
                                <div class="row">
                                    <div class="col-7">
                                        <div class="text-login_page p-4">
                                            <h5 class="text-login_page">Welcome Back !</h5>
                                            <p>Sign in to continue.</p>
                                        </div>
                                    </div>
                                    <div class="col-5 align-self-end">
                                        <img src="<?php echo Yii::$app->request->baseUrl .'/source/images/profile-img.png'?>" alt="" class="img-fluid">
                                    </div>
                                </div>
                            </div>
                            <div class="card-body pt-0"> 
                                <div align="center">
                                    <a href="index">
                                        <div class="avatar-md profile-user-wid mb-4">
                                            <span class="avatar-title rounded-circle bg-light">
                                                <img src="<?php echo Yii::$app->request->baseUrl .'/source/logo-files/'. $Themelist['logo_sm']?>" class="rounded-circle" height="70">
                                            </span>
                                        </div>
                                    </a>
                                </div>
                                <div class="p-2">
                                    <?php $form = ActiveForm::begin([
										'enableClientValidation' => true,
										'id' => 'someform',
										'options' => ['autocomplete' => 'off'],
									]); ?>
        
									<div class="form-group">
										<label for="username">Username</label>
										<?= $form->field($model, 'username')->textInput(['placeholder' => ""])->label(false); ?>
									</div>
                
									<div class="form-group">
										<label for="userpassword">Password</label>
										<?= $form->field($model, 'password',['inputOptions' => ['autocomplete' => 'off']])->passwordInput(['placeholder' => "","class"=>"form-control"])->label(false); ?>
									</div>
                
									<div class="custom-control custom-checkbox">
										<input type="checkbox" class="custom-control-input" id="customControlInline">
										<label class="custom-control-label" for="customControlInline">Remember me</label>
									</div>
									
									<?php if($this->params['customParam']=='error'){ ?>
									<div class="has-error help-block" style="color: #D8000C">Invalid Username/Password.</div>
									<?php } ?>
									<?php if($this->params['customParam']=='blocked'){ ?>
									<div class="has-error help-block" style="color: #D8000C">Please Contact your admin</div>
									<?php } ?>
									
									<div class="mt-3">
										<button type="submit" class="btn btn-login btn-block waves-effect waves-light">Log In</button>
									</div>

									<div class="mt-4 text-center">
									   <!--<a href="#" class="text-muted"><i class="mdi mdi-lock mr-1"></i> Forgot your password?</a> -->
									</div>
									
									<?php ActiveForm::end(); ?>
                                </div>
                            </div>
                        </div>
						
                        <div class="mt-5 text-center"> 
                            <div>
								<!--  <p>Don't have an account ? <a href="#" class="font-weight-medium text-primary"> Signup now </a> </p>  -->
                                <p> <?= $Themelist['footer_text'] ?> © <span id="year"></span>.</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

	    <script src="<?php echo Yii::$app->request->baseUrl .'/source/libs/jquery/jquery.min.js'?>"></script>
        <script src="<?php echo Yii::$app->request->baseUrl .'/source/libs/bootstrap/js/bootstrap.bundle.min.js'?>"></script>
        <script src="<?php echo Yii::$app->request->baseUrl .'/source/libs/metismenu/metisMenu.min.js'?>"></script>
        <script src="<?php echo Yii::$app->request->baseUrl .'/source/libs/simplebar/simplebar.min.js'?>"></script>
        <script src="<?php echo Yii::$app->request->baseUrl .'/source/libs/node-waves/waves.min.js'?>"></script>
        
        <!-- App js -->
        <script src="<?php echo Yii::$app->request->baseUrl .'/source/js/app.js'?>"></script>
		
		<script type="text/javascript">
			var year = new Date();
			var currentyear = year.getFullYear();
			document.getElementById("year").innerHTML = currentyear;
		</script>
		
    </body>