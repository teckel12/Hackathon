<?php
    $json = $_POST['json'];
	if ($_SERVER["HTTP_HOST"] == 'todo.leethost.com') {
		$json = stripslashes($json);
	}

    $fileName = 'data/todo.json';

	if (json_decode($json) != null) {
        $file = fopen($fileName, 'w+');
        fwrite($file, $json);
        fclose($file);
    } else {
        header('HTTP/1.1 422 invalid file');
    }
?>