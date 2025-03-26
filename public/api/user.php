<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json; charset=utf-8');

require_once "config.php";

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case "GET":
        // GET
        if (isset($_GET['mail'])) {
            $mail = $_GET['mail'];
            $user = get_user($mail);
            if ($user) {
                echo json_encode($user);
            } else {
                http_response_code(404);
                echo json_encode(['message' => 'User not found', "error" => "User not found"]);
            }
        } else {
            http_response_code(400);
            echo json_encode(['message' => 'Mail not set', "error" => "Mail not set"]);
        }
        break;
    case "POST":
        // Update
        $data = json_decode(file_get_contents('php://input'), true);
        if (isset($data['name']) && isset($data['mail']) && isset($data['firma']) && isset($data['standort'])) {
            $name = $data['name'];
            $mail = $data['mail'];
            $firma = $data['firma'];
            $standort = $data['standort'];
            $user = update_user($name, $mail, $firma, $standort);
            if ($user) {
                echo json_encode($user);
            } else {
                http_response_code(404);
                echo json_encode(['message' => 'User not found', "error" => "User not found"]);
            }
        } else {
            http_response_code(400);
            echo json_encode(['message' => 'Data not set', "error" => "Data not set"]);
        }
        break;
    case "PUT":
        // Create
        $data = json_decode(file_get_contents('php://input'), true);
        if (isset($data['name']) && isset($data['mail']) && isset($data['firma']) && isset($data['standort'])) {
            $name = $data['name'];
            $mail = $data['mail'];
            $firma = $data['firma'];
            $standort = $data['standort'];
            $user = create_user($name, $mail, $firma, $standort);
            if ($user) {
                echo json_encode($user);
            } else {
                http_response_code(404);
                echo json_encode(['message' => 'User not found', "error" => "User not found"]);
            }
        } else {
            http_response_code(400);
            echo json_encode(['message' => 'Data not set', "error" => "Data not set"]);
        }
        break;
    case "DELETE":
        // Delete
        $data = json_decode(file_get_contents('php://input'), true);
        if (isset($data['mail'])) {
            $mail = $data['mail'];
            $user = delete_user($mail);
            if ($user) {
                echo json_encode($user);
            } else {
                http_response_code(404);
                echo json_encode(['message' => 'User not found', "error" => "User not found"]);
            }
        } else {
            http_response_code(400);
            echo json_encode(['message' => 'Mail not set', "error" => "Mail not set"]);
        }
        break;
    default:
        http_response_code(405);
        echo json_encode(['message' => 'Method not allowed', "error" => "Method not allowed"]);
        break;
}

function get_user(string $mail)
{
    global $con;
    $stmt = $con->prepare("SELECT * FROM users WHERE mail = ?");
    $stmt->bind_param("s", $mail);
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();
    return $result->fetch_assoc();
}

function update_user(string $name, string $mail, string $firma, string $standort)
{
    global $con;
    $stmt = $con->prepare("UPDATE users SET name = ?, firma = ?, standort = ? WHERE mail = ?");
    $stmt->bind_param("ssss", $name, $firma, $standort, $mail);
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();
    return $result->fetch_assoc();
}

function create_user(string $name, string $mail, string $firma, string $standort)
{
    global $con;
    $stmt = $con->prepare("INSERT INTO users (name, firma, standort, mail) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $name, $firma, $standort, $mail);
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();
    return $result->fetch_assoc();
}

function delete_user(string $email)
{
    global $con;
    $stmt = $con->prepare("DELETE FROM users WHERE mail = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();
    return $result->fetch_assoc();
}
