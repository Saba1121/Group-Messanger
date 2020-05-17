<?php

require_once '../class.php';

$results = [];

$fetched = $messages_db -> fetch($_GET['s']);

while($row = $fetched->fetch(PDO::FETCH_ASSOC)) array_push($results, $row); 

echo json_encode($results);
