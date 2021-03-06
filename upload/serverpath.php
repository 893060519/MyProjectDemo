<?php
// Make sure file is not cached (as it happens for example on iOS devices)
header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
header("Cache-Control: no-store, no-cache, must-revalidate");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
header('Content-Type: application/json');
// Support CORS
header("Access-Control-Allow-Origin: *");

$url=dirname(__FILE__); // 取得当前文件所在的绝对目录
$path=str_replace('\\','/',$url);

// Return Success JSON-RPC response
die('{"code": 0, "description": "上传成功！", "data": "'.$path.'"}');
