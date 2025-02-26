<?php
use yii\helpers\Html;
use yii\helpers\Url;
use yii\helpers\ArrayHelper;
use yii\widgets\ActiveForm;
use yii\widgets\Pjax;

$session = Yii::$app->session;
$this->title = "Theme";

use app\models\Theme;

?>
 
<div class="main-content">
	<div class="page-content">
		<div class="container-fluid">

			<!-- start page title -->
			<div class="row">
				<div class="col-12">
					<div class="page-title-box d-flex align-items-center justify-content-between">
						<h4 class="mb-0 font-size-18">Manage Theme</h4>
					</div>
				</div>
			</div>
			<!-- end page title -->

			<div class="row">
				<div class="col-12">
				
					<?php $form = ActiveForm::begin([
                        'enableClientValidation' => true,
                        'id' => 'someform',
                        'options' => ['autocomplete' => 'off','enctype'=>'multipart/form-data'],
                    ]); ?>
                   
                    <!--Background content -->
                    <div class="row">
                        <div class="col-12">
                            <div class="card">
							
								<div class="card-body form_header_bg" style="padding-top: 0.7rem !important; padding-bottom: 0.7rem !important; " >
									<div class="row">
										<div class="col-6 addtitle">
											<h4 class="card-title">1. Background Color</h4>
										</div>
									</div>
								</div>
								
                                <div class="card-body">
								
                                    <div class="row mt-4">
                                        <div class="col-sm-4">
                                            <div class="form-group">
                                                <label for="productname">Logo Background</label>
                                                <?= $form->field($model, 'logo_bg')
                                                ->textInput(['placeholder' => "",'class'=>"colorpicker-showinput-intial form-control",])
                                                ->label(false); ?>
                                            </div>
                                        </div>

                                        <div class="col-sm-4">
                                            <div class="form-group">
                                                <label for="productname">Menu Background</label>
                                                <?= $form->field($model, 'menu_bg')
                                                ->textInput(['placeholder' => "",'class'=>"colorpicker-showinput-intial form-control", ])
                                                ->label(false); ?>
                                            </div>
                                        </div>

                                        <div class="col-sm-4">
                                            <div class="form-group">
                                                <label for="productname">Page Background</label>
                                                <?= $form->field($model, 'page_bg')
                                                ->textInput(['placeholder' => "",'class'=>"colorpicker-showinput-intial form-control", ])
                                                ->label(false); ?>
                                            </div>
                                        </div>
										
										
										<div class="col-sm-4">
                                            <div class="form-group">
                                                <label for="productname">Form Header Background</label>
                                                <?= $form->field($model, 'form_header_bg')
                                                ->textInput(['placeholder' => "",'class'=>"colorpicker-showinput-intial form-control", ])
                                                ->label(false); ?>
                                            </div>
                                        </div>

                                        
                                        
                                        <div class="col-sm-4">
                                            <div class="form-group">
                                                <label class="form-label"> Menu Text</label>
                                                <?= $form->field($model, 'menu_text')
                                                ->textInput(['placeholder' => "",'class'=>"colorpicker-showinput-intial form-control", ])
                                                ->label(false); ?>
                                            </div>
                                        </div>

                                        <div class="col-sm-4">
                                            <div class="form-group">
                                                <label class="form-label"> Menu Hover</label>
                                                <?= $form->field($model, 'menu_hover')
                                                ->textInput(['placeholder' => "",'class'=>"colorpicker-showinput-intial form-control", ])
                                                ->label(false); ?>
                                            </div>
                                        </div>
										
										
										<div class="col-sm-4">
                                            <div class="form-group">
                                                <label class="form-label"> Modal Background</label>
                                                <?= $form->field($model, 'model_bg')
                                                ->textInput(['placeholder' => "",'class'=>"colorpicker-showinput-intial form-control", ])
                                                ->label(false); ?>
                                            </div>
                                        </div>
										
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <!--Login page -->
                    <div class="row">
                        <div class="col-12">
                            <div class="card">
							
								<div class="card-body form_header_bg" style="padding-top: 0.7rem !important; padding-bottom: 0.7rem !important; " >
									<div class="row">
										<div class="col-6 addtitle">
											<h4 class="card-title">2. Login Page</h4>
										</div>
									</div>
								</div>
								
                                <div class="card-body">

                                    <div class="row mt-4">
										<div class="col-sm-4">
											<div class="form-group">
												<label for="productname">Button Text</label>
												<?= $form->field($model, 'login_text')
												->textInput(['placeholder' => "",'class'=>"colorpicker-showinput-intial form-control", ])
												->label(false); ?>
											</div>
										</div>
									
										<div class="col-sm-4">
                                            <div class="form-group">
                                                <label for="productname">Button Text Hover</label>
                                                <?= $form->field($model, 'login_text_hover')
                                                ->textInput(['placeholder' => "",'class'=>"colorpicker-showinput-intial form-control", ])
                                                ->label(false); ?>
                                            </div>
                                        </div>
										
                                        <div class="col-sm-4">
                                            <div class="form-group">
                                                <label for="productname">Button Border</label>
                                                <?= $form->field($model, 'login_border')
                                                ->textInput(['placeholder' => "",'class'=>"colorpicker-showinput-intial form-control", ])
                                                ->label(false); ?>
                                            </div>
                                        </div>
                                       
                                        <div class="col-sm-4">
                                            <div class="form-group">
                                                <label for="productname"> Button Color</label>
                                                <?= $form->field($model, 'login_normal')
                                                ->textInput(['placeholder' => "",'class'=>"colorpicker-showinput-intial form-control", ])
                                                ->label(false); ?>
                                            </div>
                                        </div>

                                        <div class="col-sm-4">
                                            <div class="form-group">
                                                <label class="form-label"> Button Hover</label>
                                                <?= $form->field($model, 'login_hover')
                                                ->textInput(['placeholder' => "",'class'=>"colorpicker-showinput-intial form-control", ])
                                                ->label(false); ?>
                                            </div>
                                        </div>
                                       
                                        <div class="col-sm-4">
                                            <div class="form-group">
                                                <label for="productname"> Header Text </label>
                                                <?= $form->field($model, 'head_text')
                                                ->textInput(['placeholder' => "",'class'=>"colorpicker-showinput-intial form-control", ])
                                                ->label(false); ?>
                                            </div>
                                        </div>

                                        <div class="col-sm-4">
                                            <div class="form-group">
                                                <label class="form-label"> Header Background </label>

                                                <?= $form->field($model, 'head_bg')
                                                ->textInput(['placeholder' => "",'class'=>"colorpicker-showinput-intial form-control", ])
                                                ->label(false); ?>

                                            </div>
                                        </div>

                                        <div class="col-sm-4">
                                            <div class="form-group">
                                                <label class="form-label"> Page Background </label>

                                                <?= $form->field($model, 'login_page_bg')
                                                ->textInput(['placeholder' => "",'class'=>"colorpicker-showinput-intial form-control", ])
                                                ->label(false); ?>

                                            </div>
                                        </div>

                                    </div>
                                
                                </div>
                            </div>
                        </div>
                    </div>

                    <!--footer content -->
                    <div class="row">
                        <div class="col-12">
                            <div class="card">
							
								<div class="card-body form_header_bg" style="padding-top: 0.7rem !important; padding-bottom: 0.7rem !important; " >
									<div class="row">
										<div class="col-6 addtitle">
											<h4 class="card-title">3. Footer</h4>
										</div>
									</div>
								</div>
								
                                <div class="card-body">

                                    <div class="row mt-4">
									
                                        <div class="col-sm-4">
                                            <div class="form-group mt-3">
                                                <label for="productname">Text</label>
                                            </div>
                                        </div>
										
                                        <div class="col-sm-8">
                                            <div class="form-group">

                                                    <?= $form->field($model, 'footer_text')
                                                    ->textInput(['placeholder' => "",])
                                                    ->label(false); ?>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <!--Logo content -->
                    <div class="row">
                        <div class="col-12">
                            <div class="card">
							
								<div class="card-body form_header_bg" style="padding-top: 0.7rem !important; padding-bottom: 0.7rem !important; " >
									<div class="row">
										<div class="col-6 addtitle">
											<h4 class="card-title">4. Files</h4>
										</div>
									</div>
								</div>
								
                                <div class="card-body">
								
                                    <div class="row mt-4">
										<div class="col-sm-4">                                                  
											<div class="form-group">
											<label for="productname">Logo </label>
												<div class="custom-file">
												<input type="file" class="custom-file-input notRequired logofile" id="customFile2" name="file2">
												<label class="custom-file-label label-logofile" for="customFile2"><?php echo $model["logo"] != ''?$model["logo"] : "Choose File" ?></label>

												<input type="hidden" id="fileupload2" class="custom-file-input notRequired" name="fileupload2">
												
												</div>
											</div>                           
										</div>    
                                       
										<div class="col-sm-4">                                                  
											<div class="form-group">
											<label for="productname">logo_sm </label>
												<div class="custom-file">
												<input type="file" class="custom-file-input notRequired logosmfile" id="customFile3" name="file3">
												<label class="custom-file-label label-logosm" for="customFile3"><?php echo $model["logo_sm"] != ''?$model["logo_sm"] : "Choose File" ?></label>

													<input type="hidden" id="fileupload3" class="custom-file-input notRequired" name="fileupload3">
												
												</div>
											</div>                           
										</div>    

										<div class="col-sm-4">                                                  
											<div class="form-group">
											<label for="productname">favicon </label>
												<div class="custom-file">
												<input type="file" class="custom-file-input notRequired faviconfile" id="customFile" name="file">
												<label class="custom-file-label label-favicon" for="customFile"><?php echo $model["favicon"] != ''?$model["favicon"] : "Choose File" ?></label>

													<input type="hidden" id="fileupload" class="custom-file-input notRequired" name="fileupload">
												
												</div>
											</div>                           
										</div> 
										
										<!-- Logo-->
										<div class="col-md-4">
											<div align="center">
													<img id="blah2" src="<?php echo ($model['logo'])?Yii::$app->getUrlManager()
													->getBaseUrl().'/source/logo-files/'.$model['logo']:Yii::$app->request->baseUrl.'/source/images/users/no-image-icon.png'; ?>" alt="" class="rounded avatar-lg" style="height:40px; width:140px !important;">
													<p class="mt-2 mb-lg-0">&emsp;</p>
											</div>
										</div>
										
                                        <!-- Logo-sm-->
										<div class="col-md-4">
											<div align="center">
													<img id="blah3" src="<?php echo ($model['logo_sm'])?Yii::$app->getUrlManager()
													->getBaseUrl().'/source/logo-files/'.$model['logo_sm']:Yii::$app->request->baseUrl.'/source/images/users/no-image-icon.png'; ?>" alt="" class="rounded avatar-lg">
													<p class="mt-2 mb-lg-0">&emsp;</p>
											</div>
										</div>
										
                                        <!-- favicon-->
										<div class="col-md-4">
											<div align="center">
													<img id="blah" src="<?php echo ($model['favicon'])?Yii::$app->getUrlManager()
													->getBaseUrl().'/source/logo-files/'.$model['favicon']:Yii::$app->request->baseUrl.'/source/images/users/no-image-icon.png'; ?>" alt="" class="rounded avatar-lg">
													<p class="mt-2 mb-lg-0">&emsp;</p>
											</div>
										</div>
                                    
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div align="center">
                        <button type="submit" class="btn btn-primary mr-1 mb-3 waves-effect waves-light">Save</button>
                    </div> 

					<?php ActiveForm::end(); ?>
					
				</div>
			</div><!-- end row -->

		</div> <!-- container-fluid -->
	</div><!-- End Page-content -->
</div><!-- End Main-content -->

<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>

<!-- For Color Picker -->
<script src="<?php echo Yii::$app->request->baseUrl . '/source/libs/spectrum-colorpicker2/spectrum.min.js' ?>"></script>
<link rel="stylesheet" type="text/css" href="<?php echo Yii::$app->request->baseUrl . '/source/libs/spectrum-colorpicker2/spectrum.min.css' ?>">
<!-- For Color Picker -->	

<script>
	
	//Show colorpicker in textbox... 
	$(".colorpicker-showinput-intial").spectrum();	
	
//for logo file...
	//Show image in imgage box and append value in file... 
	function readURLlogo(input) {
		if (input.files && input.files[0]) {
			var reader = new FileReader();
			reader.onload = function(e) {
				$('#blah2').attr('src', e.target.result);
			}
			reader.readAsDataURL(input.files[0]); // convert to base64 string
		}
    }
	
	//display file name instead of choose file...
	function displayLogoName(){

		const input = document.querySelector('.logofile');
		const labelElement = document.querySelector('.label-logofile');// Get the label element
		const selectedFile = input.files[0];

		if (selectedFile) {
			labelElement.textContent = selectedFile.name; // Set the label text to the file name
		}else{
			labelElement.textContent = "Choose File";
		}
	}
	
	$("#customFile2").change(function() {
		readURLlogo(this);
		displayLogoName();
		
	});
//for logo file...

//for logo-sm file...
	//Show image in imgage box and append value in file... 
	function readURLlogosm(input) {
		if (input.files && input.files[0]) {
			var reader = new FileReader();
			reader.onload = function(e) {
				$('#blah3').attr('src', e.target.result);
			}
			reader.readAsDataURL(input.files[0]); // convert to base64 string
		}
    }
	
	//display file name instead of choose file...
	function displayLogosmName(){

		const input = document.querySelector('.logosmfile');
		const labelElement = document.querySelector('.label-logosm');// Get the label element
		const selectedFile = input.files[0];

		if (selectedFile) {
			labelElement.textContent = selectedFile.name; // Set the label text to the file name
		}else{
			labelElement.textContent = "Choose File";
		}
	}
	
	$("#customFile3").change(function() {
		readURLlogosm(this);
		displayLogosmName();
		
	});
//for logo-sm file...

//for favicon file...
	//Show image in imgage box and append value in file... 
	function readURLfavicon(input) {
		if (input.files && input.files[0]) {
			var reader = new FileReader();
			reader.onload = function(e) {
				$('#blah').attr('src', e.target.result);
			}
			reader.readAsDataURL(input.files[0]); // convert to base64 string
		}
    }
	
	//display file name instead of choose file...
	function displayFaviconName(){

		const input = document.querySelector('.faviconfile');
		const labelElement = document.querySelector('.label-favicon');// Get the label element
		const selectedFile = input.files[0];

		if (selectedFile) {
			labelElement.textContent = selectedFile.name; // Set the label text to the file name
		}else{
			labelElement.textContent = "Choose File";
		}
	}
	
	$("#customFile").change(function() {
		readURLfavicon(this);
		displayFaviconName();
		
	});
//for favicon file...
	
</script>