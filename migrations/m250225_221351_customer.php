<?php

use yii\db\Migration;

/**
 * Class m250225_221351_customer
 */
class m250225_221351_customer extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('customer', [
            'id' => $this->primaryKey(),
            'first_name' => $this->string(),
            'last_name' => $this->string(),
            'email' => $this->string()->unique(),
            'password' => $this->string(),
            'phone' => $this->string(),
            'address' => $this->string(),
            'city' => $this->string(),
            'state' => $this->string(),
            'created_at' => $this->timestamp()->defaultExpression('CURRENT_TIMESTAMP'),
            'updated_at' => $this->timestamp()->defaultExpression('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
            'is_deleted' => $this->tinyInteger()->default(0)
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('posts');
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m250225_221351_customer cannot be reverted.\n";

        return false;
    }
    */
}
