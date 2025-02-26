<?php

use app\models\Theme;
$Themelist = Theme::find()->where(['is_delete'=>0])->orderBy('id')->asArray()->one();

//print_r($Themelist['menu_bg']);

?>

<style>
	:root {
		--logbtn_border: <?= $Themelist['login_border'] ?>;
		--logbtn_clr: <?= $Themelist['login_normal'] ?>;
		--logbtn_hover: <?= $Themelist['login_hover'] ?>;
		--head_text: <?= $Themelist['head_text'] ?>;
		--head_bg: <?= $Themelist['head_bg'] ?>;
		--login_page_bg: <?= $Themelist['login_page_bg'] ?>;
	}

	.btn-login {
		background-color: var( --logbtn_clr); 
		border-color: var( --logbtn_border);
	}

	.btn-login:hover {
		background-color: var( --logbtn_hover);
		border-color: var( --logbtn_hover);
	}

	.btn-login:not(:disabled):not(.disabled).active,
	.btn-login:not(:disabled):not(.disabled):active,
	.show > .btn-login.dropdown-toggle {
		color: #fff;
		background-color: var( --logbtn_clr); 
		border-color: var( --logbtn_border);
	}

	.btn-login.focus,
	.btn-login:focus { 
		background-color:var( --logbtn_clr); 
		border-color:var( --logbtn_border);
		-webkit-box-shadow: var( --logbtn_border);
		box-shadow:var( --logbtn_border);
	}

	.text-login_page {
		color:  var( --head_text); 
	}

	.header_bg {
		background-color: var( --head_bg); 
	}

	body {
		background-color:  var( --login_page_bg); 
	}

</style>