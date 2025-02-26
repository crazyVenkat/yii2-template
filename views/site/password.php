<?php
use yii\helpers\Html;
use yii\helpers\Url;
use yii\helpers\ArrayHelper;
use yii\widgets\ActiveForm;

$session = Yii::$app->session;
$this->title = 'Password';

use app\models\User;
?>
<div class="main-content">
    <div class="page-content">
        <div class="container-fluid">


        <!-- start page title -->
        <div class="row">
            <div class="col-12">
                <div class="page-title-box d-flex align-items-center justify-content-between">
                    <h4 class="mb-0 font-size-18">Manage Password</h4>

                    <div class="page-title-right">
                    <a href="#" class="btn btn-primary waves-effect waves-light btn-sm" ><i class="mdi mdi-arrow-left"></i> Back</a>
                    </div>

                </div>
            </div>
        </div>
        <!-- end page title -->

            
        <div class="row">
            <div class="col-12">
                <?php $form = ActiveForm::begin([
                            //    'beforeSubmit' => 'window.forms.candidate',
                            'enableClientValidation' => true,
                            //    'enableAjaxValidation' => true,
                            'id' => 'someform',
                            'options' => ['autocomplete' => 'off','enctype'=>'multipart/form-data'],
                            ]); ?>
                                
                    <div class="card">
                    
                        <div class="card-body form_header_bg">
                            <div class="row">
                                <div class="col-6 addtitle">
                                  <h4 class="card-title">Password</h4></h4>
                                </div>
                            </div>
                        </div>
                        
                        <div class="card-body">
                            <!--<h4 class="card-title">Password</h4>
                            <hr style="margin-left: -1.25rem; margin-right: -1.25rem;"> -->
                        
                            <div class="row">
                                <div class="col-12">
                        
                                    <div class="row ">
                                        <div class="col-sm-4">
                                            <label for="Password"> Current Password <span style="color:red"> * </span>  </label>
                                            <?= $form->field($model, 'Password')->textInput(['placeholder' => "", 'id'=>"old_pass", 'value'=>"", ])->label(false); ?>
                                            <span style="display:none; color:red" id="pass_err">Current password wrong  </span> 

                                        </div>

                                        <div class="col-sm-4">
                                            <label for="New Password"> New Password  <span style="color:red"> * </span> </label>
                                            <?= $form->field($model, 'New_password')->textInput(['placeholder' => "", 'id'=>"new_pass", ])->label(false); ?>
                                            <span style="display:none; color:red" id="pass_new"> New Password cannot be blank  </span> 
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div align="center">
                                <button type="submit" class="btn btn-primary mr-1 mb-3 waves-effect waves-light" id="saveit" style="display:none;">Save</button>
                            </div> 
                            <button type="button" class="btn btn-primary waves-effect waves-light" id="sa-added" style="display:none;">Click me</button>
                        </div>
                    </div>

                <?php ActiveForm::end(); ?>
            </div>
        </div>
        <!-- end row -->

        </div>  <!-- container-fluid -->
    </div>  <!-- page-content -->
</div>  <!-- End Page-content -->

<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>

<script>
$(document).ready(function(){

    $("#old_pass").keyup(function(){

        var password = $('#old_pass').val();
        var disabled = $("#new_pass").attr('disabled');

    $.ajax({
        url: '<?php echo Yii::$app->request->baseUrl.'/site/passchange'; ?>',
        type: 'GET',
        data: 'password=' + password,
        success: function(result){
            console.log(result);

                    if(result == "success" ){
                        $("#pass_err").css('display', 'none');
                        $("#new_pass").removeAttr('disabled');
                    }
                    else{
                        $("#pass_err").css('display', 'block');
                        $("#new_pass").attr('disabled', 'disabled');
                    }
                }
        });
    });

    $('form input').keydown(function (e) {
    if (e.keyCode == 13) {
        e.preventDefault();
        return false;
    }
});

//save-btn hide and show
$("#new_pass").keyup(function(){
    if($("#new_pass").val() =='' ) {
        $('#saveit').css('display','none');
                }else{
                    $('#saveit').css('display','block');
                }
});


//enable & disable the new-password input
    var pass = $("#old_pass").val();

    if(pass ===''){
                   $("#new_pass").attr('disabled', 'disabled');
                     $("#new_pass").val('');
                     //alert("remove");
                }else{
                    $("#new_pass").removeAttr('disabled');
                }




//current password length is zero error hide...

$("#old_pass").keyup(function(){

    if($("#old_pass").val().length == 0) {

        $("#pass_err").html('');
        $("#new_pass").val('');
    }
    else{
        $("#pass_err").html('Current password wrong');
        $("#pass_err").css('color','red');
    }
});


//current password length is zero error hide...
$("#new_pass,#old_pass").keyup(function(){

if($("#old_pass").val() !='' && $("#new_pass").val() !='') {

    $("#saveit").css('display','block');
}else{

    $("#saveit").css('display','none');
}
});



                
// sweet-alert 
    $("#saveit").click(function(){
        if($("#old_pass").val() !='' && $("#new_pass").val() !='') {
            $("#sa-added").trigger("click");
                    }
    });



}); //doc ready

</script>