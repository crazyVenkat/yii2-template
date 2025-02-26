<?php

use app\models\Theme;
$Themelist = Theme::find()->where(['is_delete'=>0])->orderBy('id')->asArray()->one();

//print_r($Themelist['menu_bg']);


?>
<style>

:root {
  --bgColor: <?= $Themelist['menu_bg'] ?>;
  --logoColor: <?= $Themelist['logo_bg'] ?>;
  --page_bg_Color: <?= $Themelist['page_bg'] ?>;

  --menu_text_bg: <?= $Themelist['menu_text'] ?>;
  --menu_hover_color: <?= $Themelist['menu_hover'] ?>;
  
  --logbtn_border: <?= $Themelist['login_border'] ?>;
  --logbtn_clr: <?= $Themelist['login_normal'] ?>;
  --logbtn_hover: <?= $Themelist['login_hover'] ?>;
  
  --form_header_bg: <?= $Themelist['form_header_bg'] ?>;
  --model_header_bg: <?= $Themelist['model_bg'] ?>;
}

body[data-sidebar=dark] .vertical-menu {
    background: var(--bgColor);
}

body[data-sidebar=dark].vertical-collpsed .vertical-menu #sidebar-menu>ul>li:hover>ul a{	
	background:var(--bgColor);
}

body[data-sidebar=dark].vertical-collpsed .vertical-menu #sidebar-menu>ul>li:hover>a{
    background:var(--bgColor);
}

body[data-sidebar=dark].vertical-collpsed .vertical-menu #sidebar-menu>ul ul{
    background-color: var(--bgColor);
}

body[data-sidebar=dark] .navbar-brand-box {
    background: var(--logoColor);
}

body{
	background-color: var( --page_bg_Color);
}

body[data-sidebar=dark] #sidebar-menu ul li a{
    color:var(--menu_text_bg);
}

body[data-sidebar=dark] #sidebar-menu ul li a i{
    color: var(--menu_text_bg);
}

body[data-sidebar=dark] #sidebar-menu ul li ul.sub-menu li a{
	color: var(--menu_text_bg);
}

body[data-sidebar=dark] #sidebar-menu ul li a:hover{
	color: var(--menu_hover_color);
}

body[data-sidebar=dark] #sidebar-menu ul li a:hover i{
	color: var(--menu_hover_color);
}

body[data-sidebar=dark] #sidebar-menu ul li ul.sub-menu li a:hover{
	color: var(--menu_hover_color);
}

body[data-sidebar=dark].vertical-collpsed .vertical-menu #sidebar-menu>ul>li:hover>a{
    color: var(--menu_text_bg);
}

body[data-sidebar=dark].vertical-collpsed .vertical-menu #sidebar-menu>ul>li:hover>ul a:hover{
    color:var(--menu_hover_color);
}

body[data-sidebar=dark].vertical-collpsed .vertical-menu #sidebar-menu>ul>li:hover>ul a{
    color: var(--menu_text_bg);
}

body[data-sidebar=dark].vertical-collpsed .vertical-menu #sidebar-menu>ul>li:hover>ul a{
    color:var(--menu_text_bg);
}

body[data-sidebar=dark].vertical-collpsed .vertical-menu #sidebar-menu ul li.mm-active .active i{
    color:var(--menu_text_bg);
}

.btn-login {
   /* background-color: var( --logbtn_clr); */
    border-color: var( --logbtn_border);
}

.btn-login:hover {
    border-color: var( --logbtn_hover);
}

.model_header_bg {
    background-color: var( --model_header_bg);
}
  
.form_header_bg {
    background-color: var( --form_header_bg);
}

</style>