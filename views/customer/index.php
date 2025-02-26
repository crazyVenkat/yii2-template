<?php
use yii\helpers\Html;

$session = Yii::$app->session;
$this->title = 'Customer';

?>
<div class="main-content">
	<div class="page-content">
		<div class="container-fluid">

			<!-- start page title -->
			<div class="row">
				<div class="col-12">
					<div class="page-title-box d-flex align-items-center justify-content-between">
						<h4 class="mb-0 font-size-18">Manage Customer</h4>

						<div class="page-title-right">
							<a href="<?php echo Yii::$app->getUrlManager()->getBaseUrl().'/customer/addcustomer'; ?>" class="btn btn-sm btn-success waves-effect waves-light">Add <i class="mdi mdi-plus-box-multiple"></i></a>
						</div>
					</div>
				</div>
			</div>
			<!-- end page title -->

			<div class="row">
				<div class="col-lg-12">
					<div class="card card-border">
						<div class="card-body card-body-padding">
							<div class="table-responsive table-responsive-border">
								<table class="table table-centered table-nowrap mb-0">
									<thead class="thead-light form_header_bg">
										<tr>
											<th width="5%"> <center> Id </center></th>
											<th>First name</th>
											<th>Last name</th>
											<th>Email</th>
											<th>Phone</th>
											<th><center>Action</center></th>
										</tr>
									</thead>
									<tbody>
										<?php 
										foreach($customer_list as $customer){ ?>
										<tr>
											<td> <center> <?php echo $customer['id'] ?> </center></td>
											<td><?php echo $customer['first_name'];?></td>
											<td><?php echo $customer['last_name'];?></td>
											<td><?php echo $customer['email'];?></td>
											<td><?php echo $customer['phone'];?></td>
											
											<td> <center>
												<!-- Button trigger modal -->
												<a href="<?php echo Yii::$app->getUrlManager()->getBaseUrl().'/customer/edituser?id='.$customer['id'] ?>" type="button" class="btn btn-success btn-sm btn-rounded waves-effect waves-light">
													<i class="fas fa-edit"></i>
												</a>

												<button type="button" onclick="showModal('<?php echo $customer['id']; ?>')" class="btn btn-warning btn-sm btn-rounded waves-effect waves-light">
													<i class="fas fa-trash-alt"></i>
												</button>
											</center></td> 
											
										</tr>
										<?php } ?>

									</tbody>
								</table>
							</div>
							<!-- end table-responsive -->
						</div>
					</div>
				</div>	
			</div><!-- end row -->

		</div> <!-- container-fluid -->
	</div><!-- End Page-content -->

<!--start modal delete alert -->
<div  id="deletemodal" class="modal fade delete-confirm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-sm">
        <div class="modal-content">
			<div class="modal-header model_header_bg" style="padding: 0.5rem 0.75rem !important;">
				<h5 class="modal-title mt-0">
					<i class="fas fa-exclamation-triangle"></i> Confirm
				</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body align-center">
				<p class="mb-0 mt-0">
					<center> Do you want to delete this entry? </center>
				</p>
				<div align="center">
					<button type="button" onclick="DeleteRecord()" class="btn btn-success waves-effect">Yes</button>
					<button type="submit" class="btn btn-danger waves-effect" data-dismiss="modal">No</button>
				</div>
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<script>
	
	var recordId = "";
	
	function showModal(id){
		recordId = id;
		$('#deletemodal').modal('show');
	}

	function DeleteRecord(){
		
		$.ajax({
			type:'GET',
			dataType:'text',
			data:{id:recordId},
			url :"<?php echo Yii::$app->request->baseUrl.'/customer/deletecustomer'; ?>",
			success: function(data){
				location.reload();
			}
		});
		
	}
	
</script>
