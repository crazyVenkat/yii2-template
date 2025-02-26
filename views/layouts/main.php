<?php

/* @var $this \yii\web\View */
/* @var $content string */

use app\widgets\Alert;
use yii\helpers\Html;
use yii\bootstrap\Nav;
use yii\bootstrap\NavBar;
use yii\widgets\Breadcrumbs;
//use app\assets\AppAsset;

//AppAsset::register($this);
$session = Yii::$app->session;
$loggedIn = isset($session['loggedin']) ? $session['loggedin'] : null;

use app\models\Theme;
$Themelist = Theme::find()->where(['is_delete'=>0])->orderBy('id')->asArray()->one();

?>

<?php $this->beginPage() ?>

<!DOCTYPE html>

<html lang="<?= Yii::$app->language ?>">

<head>

    <meta charset="utf-8">
    <title><?= Html::encode($this->title) ?></title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta content="Miya Commerce" name="description">

    <!-- favicon -->
    <link rel="shortcut icon" href="<?php echo Yii::$app->request->baseUrl . '/source/logo-files/'. $Themelist['favicon']?>">

    <!-- Bootstrap Css -->
    <link href="<?php echo Yii::$app->request->baseUrl . '/source/css/bootstrap.min.css' ?>" id="bootstrap-style" rel="stylesheet" type="text/css">
    <!-- Icons Css -->
    <link href="<?php echo Yii::$app->request->baseUrl . '/source/css/icons.min.css' ?>" rel="stylesheet" type="text/css">
    <!-- App Css-->

    <link href="<?php echo Yii::$app->request->baseUrl . '/source/libs/select2/css/select2.min.css' ?>" rel="stylesheet" type="text/css">
    <link rel="stylesheet" href="<?php echo Yii::$app->request->baseUrl . '/source/libs/sweetalert2/sweetalert2.min.css' ?>">

    <!-- dropzone css -->
    <link href="<?php echo Yii::$app->request->baseUrl . '/source/libs/dropzone/min/dropzone.min.css' ?>" rel="stylesheet" type="text/css">
    <link href="<?php echo Yii::$app->request->baseUrl . '/source/libs/bootstrap-datepicker/css/bootstrap-datepicker.min.css' ?>" rel="stylesheet" type="text/css">
    <link href="<?php echo Yii::$app->request->baseUrl . '/source/css/app.min.css' ?>" id="app-style" rel="stylesheet" type="text/css">
	
    <link href="https://cdn.datatables.net/1.12.0/css/dataTables.bootstrap4.min.css" type="text/css" rel="stylesheet" />
    <link href="https://cdn.datatables.net/buttons/2.2.3/css/buttons.dataTables.min.css" type="text/css" rel="stylesheet" />
	
</head>
<style>
	button.dt-button .buttons-excel .buttons-html5
	{
		background-color: green !important;
		color: white !important;
	}

	.help-block{
		font-size: 11px;
		color: red;
	}
	
	/*select{ 
		-webkit-appearance: none;	
	}*/

	.select2-container .select2-selection--single .select2-selection__rendered {
		font-weight: normal;
	}

	a {
		text-decoration: none;
		display: inline-block;
		padding: 8px 16px;
	}

	.prevtab {
		float: left;
		margin: 10px;
	}

	.nexttab {
		float: right;
		margin: 10px;
	}

	.round {
		border-radius: 50%;
	}

	.nav-tabs .nav-link {
		border: 1px solid #eee;
		border-top-left-radius: 0.25rem;
		border-top-right-radius: 0.25rem;
	}

	.nav-tabs .nav-item.show .nav-link,
	.nav-tabs .nav-link.active {
		color: white;
		background-color: #4d68e5;
		border-color: #4d68e5;
	}

	/*manage page card style*/
	.card-border{
		border-radius:6px;
	}

	.card-body-padding{
		padding-top:0rem;
		padding-bottom:1.25rem;
		padding-right:0rem;
		padding-left:0rem;
	}

	.table-responsive-border{
		border-radius:6px;
	}

	.back{
		padding-top:0px;
		padding-left:0px;
		padding-right:5px;
		padding-bottom:0px;
	}
	/*manage page card style*/

</style>

<body data-sidebar="dark">

	<?= $this->render('styles.php')?>
	
    <div class="main-wrapper">
	
        <?= $this->render('left.php')?>
		
        <div class="page-wrapper">
		
            <?= $this->render('header.php')?>
			
            <!-- partial -->
            <?= $content ?>
            <!-- partial:partials/_footer.html -->
            <footer class="footer d-flex flex-column flex-md-row justify-content-center">
				<p class="text-muted text-center text-md-left"> <?= $Themelist['footer_text'] ?> © <span id="year"></span>. All rights reserved.</p>
            </footer>
            <!-- partial -->

        </div>
    </div>

    <script src="<?php echo Yii::$app->request->baseUrl . '/source/libs/jquery/jquery.min.js' ?>"></script>
    <script src="<?php echo Yii::$app->request->baseUrl . '/source/libs/bootstrap/js/bootstrap.bundle.min.js' ?>"></script>
    <script src="<?php echo Yii::$app->request->baseUrl . '/source/libs/sweetalert2/sweetalert2.min.js' ?>"></script>
    <script src="<?php echo Yii::$app->request->baseUrl . '/source/libs/metismenu/metisMenu.min.js' ?>"></script>
    <script src="<?php echo Yii::$app->request->baseUrl . '/source/libs/simplebar/simplebar.min.js' ?>"></script>
    <script src="<?php echo Yii::$app->request->baseUrl . '/source/libs/node-waves/waves.min.js' ?>"></script>
	
    <script src="https://cdn.datatables.net/1.12.0/js/jquery.dataTables.js"></script>
    <script src="https://cdn.datatables.net/1.12.0/js/dataTables.bootstrap4.min.js"></script>
    <script src="https://cdn.datatables.net/buttons/2.2.3/js/dataTables.buttons.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"></script>
    <script type="text/javascript" src="https://cdn.datatables.net/buttons/1.3.1/js/buttons.html5.min.js"></script>

    <!-- App js -->
    <script src="<?php echo Yii::$app->request->baseUrl . '/source/libs/select2/js/select2.min.js' ?>"></script>
    <script src="<?php echo Yii::$app->request->baseUrl . '/source/libs/ion-rangeslider/js/ion.rangeSlider.min.js' ?>"></script>
    <script src="<?php echo Yii::$app->request->baseUrl . '/source/js/pages/product-filter-range.init.js' ?>"></script>
    <script src="<?php echo Yii::$app->request->baseUrl . '/source/js/pages/ecommerce-select2.init.js' ?>"></script>

    <script src="<?php echo Yii::$app->request->baseUrl . '/source/js/app.js' ?>"></script>
    <script src="<?php echo Yii::$app->request->baseUrl . '/source/js/repeater.js' ?>" type="text/javascript"></script>

    <script src="<?php echo Yii::$app->request->baseUrl . '/source/libs/twitter-bootstrap-wizard/jquery.bootstrap.wizard.min.js' ?>"></script>
    <script src="<?php echo Yii::$app->request->baseUrl . '/source/libs/twitter-bootstrap-wizard/prettify.js' ?>"></script>
    <!-- form wizard init -->
    <script src="<?php echo Yii::$app->request->baseUrl . '/source/js/pages/form-wizard.init.js' ?>"></script>
    

    <script src="<?php echo Yii::$app->request->baseUrl . '/source/libs/bootstrap-datepicker/js/bootstrap-datepicker.min.js' ?>"></script>
    <script src="https://ajax.aspnetcdn.com/ajax/jquery.validate/1.11.1/jquery.validate.min.js"></script>
    <script src="<?php echo Yii::$app->request->baseUrl . '/source/js/jquery-validation/additional-methods.min.js' ?>"></script>

    <!-- Sweet Alerts js -->
    <script src="<?php echo Yii::$app->request->baseUrl . '/source/libs/sweetalert2/sweetalert2.min.js' ?>"></script>
    <!-- Sweet alert init js-->
    <script src="<?php echo Yii::$app->request->baseUrl . '/source/js/pages/sweet-alerts.init.js' ?>"></script>
    <link href="<?php echo Yii::$app->request->baseUrl . '/source/libs/sweetalert2/sweetalert2.min.css' ?>" rel="stylesheet" type="text/css" /> 
    <!-- Sweet Alert-->
	
	<!-- console error shown -->
    <!-- color picker start-- >
    <link rel="stylesheet" type="text/css" href="< ?php echo Yii::$app->request->baseUrl . '/source/libs/spectrum-colorpicker2/spectrum.min.css' ?>">
    <script src="< ?php echo Yii::$app->request->baseUrl . '/source/libs/spectrum-colorpicker2/spectrum.min.js' ?>"></script>
    <!-- form advanced init -- >
    <script src="< ?php echo Yii::$app->request->baseUrl . '/source/js/pages/form-advanced.init2.js' ?>"></script>
    <!-- color picker end-- >
	<script src="< ?php echo Yii::$app->request->baseUrl . '/source/libs/apexcharts/apexcharts.min.js' ?>"></script>
    <script src="< ?php echo Yii::$app->request->baseUrl . '/source/js/pages/dashboard.init.js' ?>"></script>
	<!-- form advanced init -- >
    <script src="< ?php echo Yii::$app->request->baseUrl . '/source/js/pages/form-advanced.init.js' ?>"></script>
	<!-- console error shown -->

</body>

<?php
$msg = "Deeeel";
if ($session['msgType'] != '' && $session['msgType'] == 'Success')
    echo '
<script type="text/javascript">
	$(document).ready(function(){
		const Toast = Swal.mixin({
			toast: true,
			position: "top-end",
			showConfirmButton: false,
			timer: 2000
		});

		Toast.fire({
			type: "success",
			title: "' . $session['message'] . '"
		})
	});
</script>
';
unset($session['msgType']);
unset($session['message']);
?>

<?php $this->endPage() ?>

<script>
    
	var year = new Date();
	var currentyear = year.getFullYear();
	document.getElementById("year").innerHTML = currentyear;
	
	$(document).ready(function() {
		
        $('#myTable').DataTable();
        $('#myTable1').DataTable({
            dom: 'Bfrtip',
            buttons: [{
                extend: 'excel',
                text: 'Excel Export',
                exportOptions: {
                    columns: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14 ]
                }
            }]
        });
        $('#myTable12').DataTable({
            dom: 'Bfrtip',
            buttons: [{
                extend: 'excel',
                text: 'Excel Export',
                exportOptions: {
                    columns: [ 0, 2, 3, 4, 5, 6, 7, 8, 9 ]
                }
            }]
        });
        $.validator.addMethod("greaterThan",
            function(value, element, params) {

                if (!/Invalid|NaN/.test(new Date(value))) {
                    return new Date(value) > new Date($(params).val());
                }

                return isNaN(value) && isNaN($(params).val()) ||
                    (Number(value) > Number($(params).val()));
            }, 'Must be greater than From Date.');

        $.validator.addMethod("lessThan",
            function(value, element, params) {

                if (!/Invalid|NaN/.test(new Date(value))) {
                    return new Date(value) < new Date($(params).val());
                }

                return isNaN(value) && isNaN($(params).val()) ||
                    (Number(value) < Number($(params).val()));
            }, 'Must be Less than From Date.');

        $('#someform').validate({
            rules: {
                "Megasales[offerTitle]": {
                    required: true,

                },
                "Megasales[totalDeals]": {
                    required: true
                },
                "Megasales[fromDate]": {
                    required: true,
                    remote: {
                        url: "<?php echo Yii::$app->getUrlManager()->getBaseUrl(); ?>/megasales/checkdate",
                        type: "get",
                        data: {
                            fromDate: function() {
                                return $("input[name='Megasales[fromDate]']").val();
                            },
                            toDate: function() {
                                return $("input[name='Megasales[toDate]']").val();
                            },
                            indexId: function() {
                                return $("input[name='indexId']").val();
                            }
                        },
                        dataFilter: function(data) {
                            var json = JSON.parse(data);
                            if (json.msg == "true") {
                                return "\"" + "Date already exists" + "\"";
                            } else {
                                return 'true';
                            }
                        }
                    }

                },
                "Megasales[toDate]": {
                    required: true,
                    greaterThan: "#fromDate",
                    remote: {
                        url: "<?php echo Yii::$app->getUrlManager()->getBaseUrl(); ?>/megasales/checkdate",
                        type: "get",
                        data: {
                            fromDate: function() {
                                return $("input[name='Megasales[fromDate]']").val();
                            },
                            toDate: function() {
                                return $("input[name='Megasales[toDate]']").val();
                            },
                            indexId: function() {
                                return $("input[name='indexId']").val();
                            }
                        },
                        dataFilter: function(data) {
                            var json = JSON.parse(data);
                            if (json.msg == "true") {
                                return "\"" + "Date already exists" + "\"";
                            } else {
                                return 'true';
                            }
                        }
                    }
                },
                "Megasales[icon]": {
                    required: true
                },
                "Megasales[allowFrom]": {
                    required: true,
                    lessThan: "#fromDate",

                },
                "Megasales[showMenu]": {
                    required: true
                }

            },
            messages: {
                "Megasales[offerTitle]": {
                    required: "Offer title is required",

                },
                "Megasales[totalDeals]": {
                    required: "No of deals is required"
                },
                "Megasales[fromDate]": {
                    required: "Fromdate is required"
                },
                "Megasales[toDate]": {
                    required: "Todate is required"
                },
                "Megasales[icon]": {
                    required: "Icon is required"
                },
                "Megasales[allowFrom]": {
                    required: "Allowdate is required"
                },
                "Megasales[showMenu]": {
                    required: "Showmenu is required"
                }


            },
            errorElement: 'span',
            errorPlacement: function(error, element) {
                error.addClass('invalid-feedback');
                element.closest('.form-group').append(error);
            },
            highlight: function(element, errorClass, validClass) {
                $(element).addClass('is-invalid');
            },
            unhighlight: function(element, errorClass, validClass) {
                $(element).removeClass('is-invalid');

            },
            submitHandler: function(form) {
                $("#submitid").prop('disabled', true); //disable 
                form.submit();
            }
        });


        $('#someformedit').validate({
            rules: {
                "Megasales[offerTitle]": {
                    required: true,

                },
                "Megasales[totalDeals]": {
                    required: true
                },
                "Megasales[fromDate]": {
                    required: true,
                    remote: {
                        url: "<?php echo Yii::$app->getUrlManager()->getBaseUrl(); ?>/megasales/checkdate",
                        type: "get",
                        data: {
                            fromDate: function() {
                                return $("input[name='Megasales[fromDate]']").val();
                            },
                            toDate: function() {
                                return $("input[name='Megasales[toDate]']").val();
                            },
                            indexId: function() {
                                return $("input[name='indexId']").val();
                            }
                        },
                        dataFilter: function(data) {
                            var json = JSON.parse(data);
                            if (json.msg == "true") {
                                return "\"" + "Date already exists" + "\"";
                            } else {
                                return 'true';
                            }
                        }
                    }

                },
                "Megasales[toDate]": {
                    required: true,
                    greaterThan: "#fromDate",
                    remote: {
                        url: "<?php echo Yii::$app->getUrlManager()->getBaseUrl(); ?>/megasales/checkdate",
                        type: "get",
                        data: {
                            fromDate: function() {
                                return $("input[name='Megasales[fromDate]']").val();
                            },
                            toDate: function() {
                                return $("input[name='Megasales[toDate]']").val();
                            },
                            indexId: function() {
                                return $("input[name='indexId']").val();
                            }
                        },
                        dataFilter: function(data) {
                            var json = JSON.parse(data);
                            if (json.msg == "true") {
                                return "\"" + "Date already exists" + "\"";
                            } else {
                                return 'true';
                            }
                        }
                    }
                },
                "Megasales[icon]": {
                    required: false
                },
                "Megasales[allowFrom]": {
                    required: true,
                    lessThan: "#fromDate",

                },
                "Megasales[showMenu]": {
                    required: true
                }

            },
            messages: {
                "Megasales[offerTitle]": {
                    required: "Offer title is required",

                },
                "Megasales[totalDeals]": {
                    required: "No of deals is required"
                },
                "Megasales[fromDate]": {
                    required: "Fromdate is required"
                },
                "Megasales[toDate]": {
                    required: "Todate is required"
                },
                "Megasales[icon]": {
                    required: "Icon is required"
                },
                "Megasales[allowFrom]": {
                    required: "Allowdate is required"
                },
                "Megasales[showMenu]": {
                    required: "Showmenu is required"
                }


            },
            errorElement: 'span',
            errorPlacement: function(error, element) {
                error.addClass('invalid-feedback');
                element.closest('.form-group').append(error);
            },
            highlight: function(element, errorClass, validClass) {
                $(element).addClass('is-invalid');
            },
            unhighlight: function(element, errorClass, validClass) {
                $(element).removeClass('is-invalid');

            },
            submitHandler: function(form) {
                $("#submitid").prop('disabled', true); //disable 
                form.submit();
            }
        });
    });
</script>

