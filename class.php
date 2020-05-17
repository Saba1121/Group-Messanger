<?php

Class Main {
    protected $host = 'localhost';
    protected $user = 'root'; 
    protected $password = ''; 
}


Class Messages extends Main {
    public $db_conn;
    public $db_name = 'messanger';
    public $tb_name = 'messages';

    function __construct() {
        $this->db_conn = new PDO("mysql: host=$this->host; dbname=$this->db_name;", $this->user, $this->password);
    }

    function upload($message, $sender) {
        if(strlen(trim($message)) == 0) return false;

        if(!$sender) return false;

        $time = date("Y-m-d h:i:s");

        $this->db_conn->prepare("INSERT INTO messages(message, sender, time) VALUE(?,?,?)")->execute([$message, $sender, $time]);
    }

    function fetch($id = 0) {
        return $this->db_conn->query("SELECT * FROM messages WHERE id > $id");   
    }
}

$messages_db = new Messages();