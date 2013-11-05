<?php

header('Content-type: application/json');

function join_listserv($email) {
	$headers = 'From: ' . $email;
	if(mail("popshop-l-request@cornell.edu","join","join",$headers)) {
		return Array('success' => TRUE, 'email' => $email);
	} else {
		return Array('success' => FALSE,'error' => 'Doh! PHP\'s mail() function failed for some reason. Try again later?');
	}
}

function send_hello($name, $email, $message) {
	$headers = 'From: ' . $email;
	if(mail("hello@popright.in", "Message from " . $name, $message, $headers)) {
		return Array('success'=>TRUE);
	} else {
		return Array('success'=>FALSE,'error'=>'Doh! PHP\'s mail() function failed for some reason. Try again later?');
	}
}

if (isset($_POST['type'])) {
	
	$resp = '';
	
	if ($_POST['type'] == 'join' && isset($_POST['email'])) {
		
		$resp = join_listserv($_POST['email']);
		
	} elseif ($_POST['type'] == 'message' && isset($_POST['name']) && isset($_POST['email']) && isset($_POST['message'])) {
		
		$resp = send_hello($_POST['name'], $_POST['email'], $_POST['message']);
		
		//If also joining listserv
		if ($_POST['join']) {
			
			$resp2 = join_listserv($_POST['email']);
			
			//Check if either one failed
			$resp['success'] = ($resp['success'] && $resp2['success']);
			$resp['email'] = $resp2['email'];
		}
	}
	
	echo(json_encode($resp));
}

?>