<?php
/**
 * GET Books API
 * 
 * 
 * @method GET
 * @returns JSON array of books
 */

require_once 'config.php';

try {
    $sql = "SELECT id, title, author, year, publisher, category, created_at FROM books ORDER BY created_at DESC";
    $result = $conn->query($sql);
    
    if (!$result) {
        throw new Exception('Query error: ' . $conn->error);
    }
    
    $books = [];
    while ($row = $result->fetch_assoc()) {
        $books[] = $row;
    }
    
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'count' => count($books),
        'data' => $books
    ]);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Error retrieving books: ' . $e->getMessage()
    ]);
}

$conn->close();
?>
