<?php
namespace app\models;

use Yii;

class User extends \yii\db\ActiveRecord
{

    public $New_password;

    public static function tableName(){
		
       return 'login_admin';
    }
	public function rules(){
		
        return [		
		      
              [ 'password', 'required', 'message' => 'Current Password cannot be blank'],
              
            //  [ 'New_password', 'required', 'message' => 'New Password cannot be blank'],
		
		
        ];
    }
	
}
?>