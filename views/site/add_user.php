<?php
use yii\helpers\Html;
use yii\helpers\Url;
use yii\helpers\ArrayHelper;
use yii\widgets\ActiveForm;

$session = Yii::$app->session;
$this->title = 'User';

?>

<div class="main-content">
	<div class="page-content">
		<div class="container-fluid">

			<!-- start page title -->
			<div class="row">
				<div class="col-12">
					<div class="page-title-box d-flex align-items-center justify-content-between">
						<h4 class="mb-0 font-size-18">Manage Users</h4>
						<div class="page-title-right">
							<a href="<?php echo Yii::$app->request->baseUrl.'/site/user'?>" class="btn btn-primary waves-effect waves-light btn-sm" ><i class="mdi mdi-arrow-left"></i> Back</a>
						</div>
					</div>
				</div>
			</div>
			<!-- end page title -->

			<div class="row">
				<div class="col-12">
					<div class="card">
						<div class="card-body form_header_bg">
							<div class="row">
								<div class="col-6 addtitle">
								   <h4 class="card-title"><?= isset($_GET['id'])? "Edit User" : "Add User" ?></h4>
								</div>
							</div>
						</div>
						<div class="card-body">
							<?php $form = ActiveForm::begin([
								'enableClientValidation' => true,
								'id' => 'templateForm',
								'options' => [
									'autocomplete' => 'off',
									'enctype'=>'multipart/form-data'
								],
							]); ?>

							<div class="row">

								<div class="col-sm-6">
									<div class="form-group">
										<label for="username">User Name</label>
										<?= $form->field($model, 'username')
										->textInput([
											'placeholder' => "",
											'class' => 'form-control',
											'id' => "username",
										])->label(false); ?>
									</div>												
								</div>
								<div class="col-sm-6">
									<div class="form-group">
										<label for="password">Password</label>
										<?= $form->field($model, 'password')
										->textInput([
											'placeholder' => "",
											'class' => 'form-control',
											'id' => "password",
										])->label(false); ?>
									</div>												
								</div>
								
							</div>

							<div align="center">
								<a href="<?php echo Yii::$app->request->baseUrl.'/site/user'?>"  class="btn btn-outline-secondary waves-effect" > Cancel</a>
								<button type="submit" id="submit" class="btn btn-primary mr-1 waves-effect waves-light submit">Save</button>
							</div>

							<?php ActiveForm::end(); ?>
							
						</div><!-- end card body -->
					</div><!-- end card -->
				</div>
			</div><!-- end row --> 
			
        </div> <!-- container-fluid -->
	</div><!-- End Page-content -->
</div><!-- End Main content -->
