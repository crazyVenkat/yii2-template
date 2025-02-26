<div class="vertical-menu">
    <div data-simplebar="" class="h-100">
        <!--- Sidemenu -->
        <div id="sidebar-menu">
		
            <!-- Left Menu Start -->
            <ul class="metismenu list-unstyled" id="side-menu">
               
			    <li>
                    <a href="<?php echo Yii::$app->getUrlManager()->getBaseUrl().'/site/index' ?>" class="waves-effect">
                        <i class="fas fa-home"></i> <span>Dashboard</span>
                    </a>
                </li>
				
				<li>
                    <a href="<?php echo Yii::$app->getUrlManager()->getBaseUrl().'/site/user' ?>" class="waves-effect">
                        <i class="fas fa-users"></i> <span>User</span>
                    </a>
                </li>
				<li>
                    <a href="<?php echo Yii::$app->getUrlManager()->getBaseUrl().'/customer/index' ?>" class="waves-effect">
                        <i class="fas fa-users"></i> <span>Customer</span>
                    </a>
                </li>
				
				<?php /*
				<li>
                    <a href="javascript: void(0);" class="has-arrow waves-effect">
                        <i class="far fa-list-alt"></i><span> Manage</span> 
					</a>
                    <ul class="sub-menu" aria-expanded="false">
						<li>
							<a href="<?php echo Yii::$app->getUrlManager()->getBaseUrl().'/site/index' ?>">
								&#8226;&emsp; State 
							</a>
						</li>
                    </ul>
                </li> */ ?>
				
				<li>
                    <a href="javascript: void(0);" class="has-arrow waves-effect">
                        <i class="fas fa-cog"></i><span> Settings</span> 
					</a>
                    <ul class="sub-menu" aria-expanded="false">
					
                        <li><a href="#">&#8226;&emsp; Profile</a></li>
						
						<li> 
							<a href="<?php echo Yii::$app->getUrlManager()->getBaseUrl().'/site/password' ?>" class="waves-effect">  
								&#8226;&emsp; Password
							</a>
						</li>
						
						<li> 
							<a href="<?php echo Yii::$app->getUrlManager()->getBaseUrl().'/site/theme' ?>" class="waves-effect">  
								&#8226;&emsp; Theme
							</a>
						</li>
                    </ul>
                </li>
				
				<li>
                    <a href="<?php echo Yii::$app->getUrlManager()->getBaseUrl().'/site/signout' ?>" class=" waves-effect">
                        <i class="fas fa-power-off"></i> <span>Logout</span>
                    </a>
                </li>
            </ul>
			
        </div>
        <!-- Sidebar -->
    </div>
</div>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"> </script>