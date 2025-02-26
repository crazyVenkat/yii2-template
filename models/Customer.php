<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "customer".
 *
 * @property int $id
 * @property string|null $first_name
 * @property string|null $last_name
 * @property string|null $email
 * @property string|null $password
 * @property string|null $phone
 * @property string|null $address
 * @property string|null $city
 * @property string|null $state
 */
class Customer extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'customer';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['first_name', 'email', 'password', 'phone'], 'required'],
            [['first_name', 'last_name'], 'string', 'max' => 50],
            ['email', 'email'],
            ['email', 'unique', 'message' => 'Email already exists'],
            ['password', 'string', 'min' => 6], 
            ['phone', 'string', 'max' => 15], 
            [['address', 'city', 'state'], 'string', 'max' => 255],
            ['is_deleted', 'in', 'range' => [0, 1]]
        ];
        
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'first_name' => 'First Name',
            'last_name' => 'Last Name',
            'email' => 'Email',
            'password' => 'Password',
            'phone' => 'Phone',
            'address' => 'Address',
            'city' => 'City',
            'state' => 'State',
            'is_deleted'
        ];
    }
}
