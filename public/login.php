<?php
header("Content-Type: application/json");

$conn = pg_connect("host=localhost dbname=seubanco user=seuusuario password=suasenha");

$dados = json_decode(file_get_contents("php://input"), true);
$usuario = $dados["usuario"];
$senha   = $dados["senha"];

$result = pg_query_params($conn, "SELECT password_hash FROM usuarios WHERE username=$1", [$usuario]);

if (pg_num_rows($result) === 0) {
    echo json_encode(["sucesso" => false]);
    exit;
}

$row = pg_fetch_assoc($result);
$hash = $row["password_hash"];

if (password_verify($senha, $hash)) {
    echo json_encode(["sucesso" => true]);
} else {
    echo json_encode(["sucesso" => false]);
}
?>
