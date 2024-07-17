<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    return 0;
}

require '../dao/MacrosDao.class.php';
$datos = MacrosDao::getInstance();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $id = $_GET['id'];
    if (empty($id)) {
        $response['food'] = $datos->getFood();
        $response["mensaje"] = "Ok";
        $response["code"] = 200;
        http_response_code(200);
        echo json_encode($response);
    } else {
        $response['food'] = $datos->getFoodById($id);
        $response["mensaje"] = "Ok";
        $response["code"] = 200;
        http_response_code(200);
        echo json_encode($response);
    }
} 
/*else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $inputJSON = file_get_contents('php://input');
    $input = json_decode($inputJSON, TRUE);

    $correcto = true;
    $datosIncorrectos = " Hace falta: titulo o tema_id";
    if (empty($input['titulo']) || empty($input['tema_id'])) {
        $correcto = false;
    }

    if ($correcto) {

        $titulo = !empty($input['titulo']) ? $input['titulo'] : null;
        $descripcion = !empty($input['descripcion']) ? $input['descripcion'] : null;
        $tema_id = !empty($input['tema_id']) ? $input['tema_id'] : null;

        if ($datos->guardarTema($tema_id, $titulo, $descripcion)) {
            $response["mensaje"] = "Guardado correctamente";
            $response["code"] = 201;
            http_response_code(201);
            echo json_encode($response);
        } else {
            $response["mensaje"] = "Ocurrió algún error al guardar";
            $response["code"] = 500;
            http_response_code(500);
            echo json_encode($response);
        }
    } else {
        $response["mensaje"] = "Bad request";
        $response["resultado"] = $datosIncorrectos;
        $response["code"] = 400;
        http_response_code(400);
        echo json_encode($response);
    }

} else if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $inputJSON = file_get_contents('php://input');
    $input = json_decode($inputJSON, TRUE);

    $id = !empty($input['id']) ? $input['id'] : null;
    $titulo = !empty($input['titulo']) ? $input['titulo'] : null;
    $descripcion = !empty($input['descripcion']) ? $input['descripcion'] : null;
    $tema_id = !empty($input['tema_id']) ? $input['tema_id'] : null;
    $estatus = !empty($input['estatus']) ? $input['estatus'] : null;

    if ($datos->actualizarClase($id,$tema_id,$titulo,$descripcion,$estatus)) {
        $response["mensaje"] = "Guardado correctamente";
        $response["code"] = 200;
        http_response_code(200);
        echo json_encode($response);
    } else {
        $response["mensaje"] = "Ocurrió algún error al guardar";
        $response["code"] = 500;
        http_response_code(500);
        echo json_encode($response);
    }

} else if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $id = $_GET['id'];
    $response['success'] = $datos->desactivarClase($id);
    $response["mensaje"] = "Ok";
    $response["code"] = 200;
    http_response_code(200);
    echo json_encode($response);
}*/

?>