<?php

namespace app\components;

use Yii;
use yii\helpers\Html;
use yii\widgets\ActiveForm;
use yii\helpers\BaseHtml;
use yii\helpers\Url;
use yii\helpers\ArrayHelper;
use yii\base\Component;
use yii\base\InvalidConfigException;
use webvimark\modules\UserManagement\models\rbacDB\Role;
use yii\web\UrlRuleInterface;
use yii\base\BaseObject;
use app\models\Stock;


class Functions extends Component
{
   
	function getSelected($value, $check)
    {
        $status = "";
		
        if ($value != $check) {
            $status = "";
        } elseif ($value == $check) {
            $status = "selected";
        } else {
            $status = "";
        }

        return $status;
    }
	
	public function customPagination($total_records, $page, $current_url)
    {
        
        $limit = 10;
        $total_pages = ceil($total_records / $limit);
        $prevstate = "disabled";
        $nextstate = "";
        $limit = 10;
        $total_pages = ceil($total_records / $limit);
        $prevstate = "disabled";
        $nextstate = "";
        $start_page = 0;

        if (count($_GET) == 0) {
            $current_url = $current_url . "?";
        } else {
            $current_url = $current_url . "?";
        }
        $next = $page;

        if ( $page < 2) {
            $prevstate = "disabled";
        } else {
            $prevstate = "";
        }

        if ($total_pages > 0) {
            $start_page = 1;
        }

        if ( $page > 5) {
            $start_page = $page - 5;
            $end_page = $page + 5;

            if ($end_page > $total_pages) {
                $end_page = $total_pages;
            }
        } else {
            if ($total_pages > $page + 5) {
                $end_page =  $page + 5;
            } else {
                $end_page = $total_pages;
            }

            if ($end_page - $start_page < 10) {
                if ($end_page < $total_pages) {
                    $end_page = $end_page + (10 - $end_page);
                }
            }

            if ($end_page > $total_pages) {
                $end_page = $total_pages;
            }
        }

        if ($total_pages > 1) {
            if ($page <= $total_pages) {
                echo '<nav>
                <ul class="pagination">
                    <li class="page-item previous previous '.$prevstate.'">
                        <a class="page-link" href="'.$current_url.'page=1" aria-label="Next">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>';
                    if ($page > 1) { 
                        echo '<li class="page-item previous '.$prevstate.'">
                            <a class="page-link" href="'.$current_url.'page='.($page-1).'" aria-label="Previous">
                                <span aria-hidden="true">&lsaquo;</span>
                            </a>
                        </li>';
                    }
                    for ($i = $start_page; $i <= $end_page; $i++) 
                    {
                        $active_class = $page;
                        $activeitem = $active_class == $i ? "page-item active" : "active";
                        echo '<li class="'.$activeitem.'" >
                                <a class="pagination-numbers page-link" href="'.$current_url.'page='.$i.'">'.$i.'</a>
                            </li>';
                    }
                    if ($i > 1) {
                        if ($page == $total_pages) {
                            $nextstate = "disabled";
                        } else {
                            $nextstate = "";
                        }
                    }
                    echo '<li class="page-item nexts '.$nextstate.'">';
                    if ($i > 1) {
                        if ($page < $total_pages) {
                            echo '<li class="page-item nexts '.$nextstate.'">
                                <a class="page-link" href="'.$current_url.'page='.($next + 1).'" aria-label="Next">
                                    <span aria-hidden="true">&rsaquo;</span>
                                </a>
                            </li>';
                        }
                    }
                    echo '<li class="page-item nexts '.$nextstate.'">
                                <a class="page-link" href="'.$current_url.'page='.$total_pages.'" aria-label="Next">
                                    <span aria-hidden="true">&raquo;</span>
                                </a>
                            </li>
                        </ul>
                    </nav>';
            }
        }
    }
  	
	//For Compress an Image
	public function compressImage($imageUrl, $uploadPath)
    {
		$result = "";

		$imageContent = file_get_contents($imageUrl);

		if ($imageContent !== false) {

			$image = imagecreatefromstring($imageContent);

			if ($image !== false) {

				$pathInfo = pathinfo($imageUrl);

				$imageExtension = strtolower($pathInfo['extension']);

				$fileName = Yii::$app->security->generateRandomString(16) . '.' . $imageExtension;

				$compressionQuality = 40; // Adjust this value as needed

				$outputFilePath = $uploadPath . '/' . $fileName;

				imagejpeg($image, $outputFilePath, $compressionQuality);

				imagedestroy($image);

				$result = $fileName;

			} else {

				$result = 'Failed to create image from the URL content.';
			}
		} else {

			$result = 'Failed to fetch image content from the URL.';
		}

		return $result;
    }
	
	
// end	
}