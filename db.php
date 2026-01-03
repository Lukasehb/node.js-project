<?php
// db.php
$dbPath = __DIR__ . '/database.sqlite';

try {
    $pdo = new PDO("sqlite:" . $dbPath);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Fout: " . $e->getMessage();
    exit;
}
?>