<?php

$params = require __DIR__ . '/params.php';
$db = require __DIR__ . '/db.php';

$config = [
    'id' => 'basic',
	'defaultRoute' =>'login',
    'basePath' => dirname(__DIR__),
    'bootstrap' => ['log'],
    'aliases' => [
        '@bower' => '@vendor/bower-asset',
        '@npm'   => '@vendor/npm-asset',
    ],
    'components' => [
        'request' => [
            // !!! insert a secret key in the following (if it is empty) - this is required by cookie validation
            'cookieValidationKey' => 'mZoUjMiTQ32dq7j3ftdo-gQhN1DwstPK',
        ],
        'cache' => [
            'class' => 'yii\caching\FileCache',
        ],
		'mycomponent' => [
            'class' => 'app\components\Functions',
        ],
        'user' => [
            'identityClass' => 'app\models\User',
            'enableAutoLogin' => true,
        ],
        'errorHandler' => [
            'errorAction' => 'site/error',
        ],
        'mailer' => [
            'class' => 'yii\swiftmailer\Mailer',
            // send all mails to a file by default. You have to set
            // 'useFileTransport' to false and configure a transport
            // for the mailer to send real emails.
            'useFileTransport' => true,
        ],
        'log' => [
            'traceLevel' => YII_DEBUG ? 3 : 0,
            'targets' => [
                [
                    'class' => 'yii\log\FileTarget',
                    'levels' => ['error', 'warning'],
                ],
            ],
        ],
        'db' => $db,
        
        'urlManager' => [
            'enablePrettyUrl' => true,
            'showScriptName' => false,
            'rules' => [
			'product/editproduct/<id:\d+>' => 'product/editproduct',
			'dieter/edituser/<id:\d+>' => 'dieter/edituser',
			'dieter/profile/<id:\d+>' => 'dieter/profile',
			'settings/editblood/<id:\d+>' => 'settings/editblood',
			'settings/editphysical/<id:\d+>' => 'settings/editphysical',
			'settings/editdisease/<id:\d+>' => 'settings/editdisease',
			'settings/editfood/<id:\d+>' => 'settings/editfood',
			'settings/editcuisine/<id:\d+>' => 'settings/editcuisine',
			'leads/edituser/<id:\d+>' => 'leads/edituser',
			'settings/editpackagecategory/<id:\d+>' => 'settings/editpackagecategory',
			'settings/editfooddetails/<id:\d+>' => 'settings/editfooddetails',
			'settings/editpack/<id:\d+>' => 'settings/editpack',
			'payments/editpay/<id:\d+>' => 'payments/editpay',
			'business/uploadproduct/<id:\d+>' => 'business/uploadproduct',
			'business/productuploads/<id:\d+>' => 'business/productuploads',
			'business/fetchproductuploads/<id:\d+>' => 'business/fetchproductuploads',

				'site/uploadproductservice/<id:\d+>' => 'site/uploadproductservice',
			'site/productuploadsservice/<id:\d+>' => 'site/productuploadsservice',
			'site/fetchproductuploadsservice/<id:\d+>' => 'site/fetchproductuploadsservice',
            ],
        ],
        
    ],
    'params' => $params,
];

if (YII_ENV_DEV) {
    // configuration adjustments for 'dev' environment
    $config['bootstrap'][] = 'debug';
    $config['modules']['debug'] = [
        'class' => 'yii\debug\Module',
        // uncomment the following to add your IP if you are not connecting from localhost.
        //'allowedIPs' => ['127.0.0.1', '::1'],
    ];

    $config['bootstrap'][] = 'gii';
    $config['modules']['gii'] = [
        'class' => 'yii\gii\Module',
        // uncomment the following to add your IP if you are not connecting from localhost.
        //'allowedIPs' => ['127.0.0.1', '::1'],
    ];
}

return $config;
