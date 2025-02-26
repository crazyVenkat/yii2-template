<?php

namespace app\controllers;

use Yii;
use app\models\Customer;

class CustomerController extends \yii\web\Controller
{
    public function actionIndex()
    {
        $customer_list = Customer::find()->where(['is_deleted' => 0])->asArray()->all();

        return $this->render('index', ['customer_list' => $customer_list]);
    }

    public function actionAddcustomer() {

		$session = Yii::$app->session;
		$loggedIn = isset($session['loggedin']) ? $session['loggedin'] : null;
		if($loggedIn == null){
            return Yii::$app->response->redirect(array('login/index'));
		}
		
		$model = new Customer();
        if ($model->load(Yii::$app->request->post()) && $model->validate()) {
			$model_post = Yii::$app->request->post('Customer');
			$model->first_name = $model_post['first_name'];
			$model->last_name = $model_post['last_name'];
			$model->email = $model_post['email'];
			$model->password = $model_post['password'];
			$model->phone = $model_post['phone'];
			$model->address = $model_post['address'];
			$model->city = $model_post['city'];
			$model->state = $model_post['state'];
			$model->save(false);
            $session['msgType'] = 'Success';
            $session['message'] = 'New Customer Added Successfully!';
            return Yii::$app->response->redirect(array('customer/index'));
        } 
		
		return $this->render('add_customer', ['model' => $model]); 
    }

    public function actionDeletecustomer() {
		
		$session = Yii::$app->session;
		
		$model = Customer::find()->where(['id' => $_GET['id'] ])->one();
		$model->is_deleted = 1;
		
        if($model->save(false)){
			$new_customer = Customer::find()->where(['id' => $_GET['id']])->one();
			$new_customer->is_deleted = 1;
			$new_customer->save(false);
		}
		
		$session['msgType'] = 'Success';
		$session['message'] = 'Customer Deleted Successfully!';
		
        return "success";
    }

	public function actionEdituser(){
		
		$session = Yii::$app->session;
		$loggedIn = isset($session['loggedin']) ? $session['loggedin'] : null;
		if($loggedIn == null){
          return Yii::$app->response->redirect(array('login/index'));
		}
		
		$model = Customer::find()->where(['id'=>$_GET['id'] ])->one();
		
		if ($model->load(Yii::$app->request->post()) && $model->validate()) {
			$model_post = Yii::$app->request->post('Customer');
			$model->first_name = $model_post['first_name'];
			$model->last_name = $model_post['last_name'];
			$model->email = $model_post['email'];
			$model->password = $model_post['password'];
			$model->phone = $model_post['phone'];
			$model->address = $model_post['address'];
			$model->city = $model_post['city'];
			$model->state = $model_post['state'];
			$model->save(false);
			$session['msgType'] = 'Success';
			$session['message'] = 'Customer Details Updated Successfully!';
			return Yii::$app->response->redirect(array('customer/index'));
        } 
		return $this->render('add_customer', ['model' => $model]); 
    }

}
