<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json; charset=utf-8');

require_once "config.php";

$method = $_SERVER['REQUEST_METHOD'];

if ($method == 'GET') {
    echo json_encode(['message' => 'GET method', "error" => false]);
} elseif ($method == 'POST') {
    echo json_encode(['message' => 'POST method', "error" => false]);
} elseif ($method == 'PUT') {
    echo json_encode(['message' => 'PUT method', "error" => false]);
} elseif ($method == 'DELETE') {
    echo json_encode(['message' => 'DELETE method', "error" => false]);
} else {
    http_response_code(405);
    echo json_encode(['message' => 'Method not allowed', "error" => "Method not allowed"]);
}
