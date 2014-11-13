<?php
$answer = Array();
if(!isset($_POST["name"]) || !isset($_POST["email"]) || !isset($_POST["password"]) || !isset($_POST["nationality"]) || !isset($_POST["birth"])) {
	$answer["err"] = "Invalid data sent.";
	return send($answer);
}

/// save to Db

// if save is fine:
$answer["registrationSaved"] = "true";

send($answer);
 
function send($answer) {
	echo json_encode($answer);
}
?>
