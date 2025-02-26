<?php
namespace app\models;

use Yii;

class Users extends \yii\db\ActiveRecord
{

    public static function tableName(){
		
       return 'users';
    }
	public function rules(){
		
        return [		
		      
            [ 'password', 'required', 'message' => 'Password cannot be blank'],
            [ 'username', 'required', 'message' => 'User Name cannot be blank'],
			[ [ 'username'], 'unique', 'message' => 'User Name Already exist' ],
        ];
    }
	
}
?>