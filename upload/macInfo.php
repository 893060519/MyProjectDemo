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

//获取MAC地址
include('GetMAC.php');
$mac = new GetMacAddr(PHP_OS);
$mac = $mac->mac_addr;

// Return Success JSON-RPC response
die('{"code": 0, "description": "成功！", "mac": "'.$mac.'"}');
//die($mac);
?>