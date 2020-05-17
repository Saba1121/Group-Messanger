<?php

require_once '../class.php';


$messages_db -> upload($_GET['message'], $_GET['user']);

