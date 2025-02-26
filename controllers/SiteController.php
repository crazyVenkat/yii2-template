<?php

namespace app\controllers;

use Yii;
use yii\filters\AccessControl;
use yii\web\Controller;
use yii\web\Response;
use yii\filters\VerbFilter;
use yii\web\UploadedFile;
use yii\helpers\Json;

use app\models\User;
use app\models\Theme;
use app\models\Users;


use PHPUnit\Util\Log\JSON as LogJSON;

class SiteController extends Controller
{
    public $enableCsrfValidation = false;
    
	/**
    * {@inheritdoc}
    */
	
    public function behaviors()
    {
        return [
            'access' => [
                'class' => AccessControl::className(),
                'only' => ['logout'],
                'rules' => [
                    [
                        'actions' => ['logout'],
                        'allow' => true,
                        'roles' => ['@'],
                    ],
                ],
            ],
            'verbs' => [
                'class' => VerbFilter::className(),
                'actions' => [
                    'logout' => ['post'],
                ],
            ],
        ];
    }

    /**
    * {@inheritdoc}
    */
	
    public function actions()
    {
        return [
            'error' => [
                'class' => 'yii\web\ErrorAction',
            ],
            'captcha' => [
                'class' => 'yii\captcha\CaptchaAction',
                'fixedVerifyCode' => YII_ENV_TEST ? 'testme' : null,
            ],
        ];
    }

    public function actionIndex()
    {
		$session = Yii::$app->session;
		$loggedIn = isset($session['loggedin']) ? $session['loggedin'] : null;
		if($loggedIn==null){
          return Yii::$app->response->redirect(array('login/index'));
		}
        return $this->render('index');
    }

    public function actionSignout()
    {
		$session = Yii::$app->session;
        unset($session['loggedin']);
        return Yii::$app->response->redirect(array('login/index'));
    }

    public function actionAllaction(){
        $controller=Yii::$app;
		//$actions = array_keys($controller->actions());
        return json_encode($controller);
    }
	
	/*======  Settings Menu =====*/

    /**
     * Displays Password Menu.
     *
     * @return string
    **/
	
	/*===== Checking Current Password =====*/
	public function actionPasschange(){

		$session = Yii::$app->session;
		$model = User::find()->where(['userid' => $session['userid'], 'role' => $session['loggedin'] ])->one();
		// print_r( $session['userId']); exit;
		
		if( $model->password == md5($_GET['password']) ){
			return "success";
		}else{
			return false;
		}
	}
	
	/*===== Save New Paasword  =====*/
	public function actionPassword()
	{
		$session = Yii::$app->session;
		$model = User::find()->where(['userid' => $session['userid'], 'role' => $session['loggedin']])->one();

		if ($model->load(Yii::$app->request->post()) && $model->validate()) {
			$modelPost=Yii::$app->request->post('User');

			$model->password = md5($modelPost['New_password']);

			if($model->save(false)){
			   // $session['msgType'] = 'Success';
			   // $session['message'] = 'New Password Added Successfully!';
				return Yii::$app->response->redirect(array('site/password'));
			} 
		} 
		
		return $this->render('password', ['model' => $model]);
	}

	/**
     * Displays Themes Menu.
     *
     * @return string
    **/
	
	public function actionTheme()
    {
		$session = Yii::$app->session;
		$loggedIn = isset($session['loggedin']) ? $session['loggedin'] : null;
		if($loggedIn==null){
          return Yii::$app->response->redirect(array('login/index'));
		}
		
		$model = Theme::find()->one();
		if ($model->load(Yii::$app->request->post()) && $model->validate()) {
			$modelPost=Yii::$app->request->post('Theme');

			$model->logo_bg =  $modelPost['logo_bg'];
			$model->menu_bg =  $modelPost['menu_bg'];
			$model->page_bg = $modelPost['page_bg'];
			$model->login_text =  $modelPost['login_text'];
			$model->login_text_hover =  $modelPost['login_text_hover'];
			$model->login_border =  $modelPost['login_border'];
			$model->login_normal =  $modelPost['login_normal'];
			$model->login_hover =  $modelPost['login_hover'];
			$model->head_text =  $modelPost['head_text'];
			$model->head_bg =  $modelPost['head_bg'];
			$model->login_page_bg =  $modelPost['login_page_bg'];
			$model->footer_text =  $modelPost['footer_text'];
			$model->menu_text =  $modelPost['menu_text'];
			$model->menu_hover =  $modelPost['menu_hover'];
			$model->form_header_bg =  $modelPost['form_header_bg'];
			$model->model_bg =  $modelPost['model_bg'];

			if (isset($_FILES['file2']) && !empty($_FILES['file2']['name'])) {
				$file2 =UploadedFile::getInstanceByName('file2');
				$original_name = $file2->baseName;  
				$file2->saveAs('source/logo-files/' . strtotime('now') . $file2->baseName . '.' . $file2->extension);
				$model->logo =strtotime('now') . $file2->baseName . '.' . $file2->extension;
			}

			if (isset($_FILES['file3']) && !empty($_FILES['file3']['name'])) {
				$file3 =UploadedFile::getInstanceByName('file3');
				$original_name = $file3->baseName;  
				$file3->saveAs('source/logo-files/' . strtotime('now') . $file3->baseName . '.' . $file3->extension);
				$model->logo_sm =strtotime('now') . $file3->baseName . '.' . $file3->extension;
			}
			
			if (isset($_FILES['file']) && !empty($_FILES['file']['name'])) {
				$file =UploadedFile::getInstanceByName('file');
				$original_name = $file->baseName;  
				$file->saveAs('source/logo-files/' . strtotime('now') . $file->baseName . '.' . $file->extension);
				$model->favicon =strtotime('now') . $file->baseName . '.' . $file->extension;
			}

			$model->createdDate =date('Y-m-d H:i:s');
			if($model->save(false)){
				$session['msgType'] = 'Success';
				$session['message'] = 'Theme Updated Successfully!';
				return Yii::$app->response->redirect(array('site/theme'));
			} 
        } 
        return $this->render('add_theme', ['model' => $model]);
    }

	/**** USERS CRUD */
	public function actionUser() {
		$session = Yii::$app->session;
		$loggedIn = isset($session['loggedin']) ? $session['loggedin'] : null;
		if($loggedIn==null){
          return Yii::$app->response->redirect(array('login/index'));
		}
		
		return $this->render('user'); 
    }
	
	public function actionAdduser(){
		
		$session = Yii::$app->session;
		$loggedIn = isset($session['loggedin']) ? $session['loggedin'] : null;
		if($loggedIn==null){
          return Yii::$app->response->redirect(array('login/index'));
		}
		
		$model = new Users();
		if ($model->load(Yii::$app->request->post()) && $model->validate()) {
			$modelPost=Yii::$app->request->post('Users');
			
			$model->username = $modelPost['username'];
			$model->password = $modelPost['password'];
			
			if($model->save(false)){
				$newUser = new User();
				$newUser->username = $model->username;
				$newUser->password = md5($model->password);
				$newUser->role = "User";
				$newUser->userid = $model->id;
				$newUser->status = 1;
				if($newUser->save(false)){
					$model->loginid = $newUser->id;
					$model->save(false);
				}
				$session['msgType'] = 'Success';
				$session['message'] = 'New User Added Successfully!';
				return Yii::$app->response->redirect(array('site/user'));
			}
        } 
		return $this->render('add_user', ['model' => $model]); 
    }
	
	public function actionEdituser(){
		
		$session = Yii::$app->session;
		$loggedIn = isset($session['loggedin']) ? $session['loggedin'] : null;
		if($loggedIn==null){
          return Yii::$app->response->redirect(array('login/index'));
		}
		
		$model = Users::find()->where(['id'=>$_GET['id'] ])->one();
		
		if ($model->load(Yii::$app->request->post()) && $model->validate()) {
			$modelPost=Yii::$app->request->post('Users');
			
			$model->username = $modelPost['username'];
			$model->password = $modelPost['password'];
			
			if($model->save(false)){
				$newUser = User::find()->where(['userid'=>$_GET['id'], "role"=>"User" ])->one();
				$newUser->username = $model->username;
				$newUser->password = md5($model->password);
				$newUser->save(false);
				$session['msgType'] = 'Success';
				$session['message'] = 'User Details Updated Successfully!';
				return Yii::$app->response->redirect(array('site/user'));
			}
        } 
		return $this->render('add_user', ['model' => $model]); 
    }
	
	public function actionDeleteuser(){
		
		$session = Yii::$app->session;
		
		$model = Users::find()->where(['id'=>$_GET['id'] ])->one();
        $username = $model->username."_del";
		
		$model->username = $username;
		$model->isdelete = 1;
		
        if($model->save(false)){
			$newUser = User::find()->where(['userid'=>$_GET['id'], "role"=>"User" ])->one();
			$newUser->username = $username;
			$newUser->status = 0;
			$newUser->is_delete = 1;
			$newUser->save(false);
		}
		
		$session['msgType'] = 'Success';
		$session['message'] = 'User Deleted Successfully!';
		
        return "success";
    }
	
// end   
}