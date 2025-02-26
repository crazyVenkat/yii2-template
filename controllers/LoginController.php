<?php

namespace app\controllers;

use Yii;
use yii\filters\AccessControl;
use yii\web\Controller;
use yii\web\Response;
use yii\filters\VerbFilter;
use yii\web\UploadedFile;
use app\models\LoginForm;
use app\models\User;
use app\models\Countries;
use app\models\States;
use app\models\Cities;
use app\models\Dietitian;
use yii\helpers\Json;
Yii::$app->view->params['customParam'] = 'customValue';
Yii::$app->view->params['username'] = '';
Yii::$app->view->params['password_hash'] = '';
Yii::$app->view->params['error'] = '';
class LoginController extends Controller
{
    /**
     * {@inheritdoc}
     */
	 public $layout=false;
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

    /**
     * Displays homepage.
     *
     * @return string
    **/
	
    public function actionIndex(){
        $session = Yii::$app->session;
		$model = new User();
	   
	    $loggedIn = isset($session['loggedin']) ? $session['loggedin'] : null;
		if($loggedIn=='Admin'){
          return Yii::$app->response->redirect(array('site/index'));
		}
		
		if ($model->load(Yii::$app->request->post()) && $model->validate()) {
		   
			$modelPost=Yii::$app->request->post('User');

			$password = md5($modelPost['password']);
        
			$validate = User::find()->where(['username'=>$modelPost['username'], 'password'=> $password  ])->one();

			if($validate){
				
				if($validate->status==0){
				  $this->view->params['customParam'] = 'blocked';
			      return $this->render('login', ['model' => $model,]);
				}
				
				if($validate->role=='Admin'){
				   $session['loggedin'] = 'Admin';
				   $session['userid'] = $validate->userid;
				  return Yii::$app->response->redirect(array('site/index'));
				}
				
			}else{
			   $this->view->params['customParam'] = 'error';
			   return $this->render('login', ['model' => $model,]);
			}
		}
       return $this->render('login', ['model' => $model,]);
    }


    public function actionLogin(){
        $session = Yii::$app->session;
		$model = new User();
	    $loggedIn = isset($session['loggedin']) ? $session['loggedin'] : null;
		
	    if($loggedIn=='Admin'){
			return Yii::$app->response->redirect(array('site/index'));
		}
		
		if ($model->load(Yii::$app->request->post()) && $model->validate()) {
			$modelPost=Yii::$app->request->post('User');
			$validate = User::find()->where(['UserName'=>$modelPost['UserName']])->andWhere(['Password'=>$modelPost['Password']])->one();
			
			if($validate){
				if($validate->role=='Admin'){
				   $session['loggedin'] = 'Admin';
				  return Yii::$app->response->redirect(array('site/index'));
				}else{
				   return $this->render('login', ['model' => $model,]);
				}
			 
			}else{
			   $this->view->params['customParam'] = 'error';
			   $this->view->params['username'] = $modelPost['username'];
			   $this->view->params['password_hash'] = $modelPost['password_hash'];
			   return $this->render('login', ['model' => $model,]);
			}
		}
		return $this->render('login', ['model' => $model,]);
    }

    /**
     * Logout action.
     *
     * @return Response
    **/
    public function actionLogout()
    {
		Yii::$app->user->logout();
        return $this->goHome();
    }
	
}
