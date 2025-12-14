<?php
/**
 * DELETE Book API
 * 
 * 
 * @method DELETE
 * @body JSON {id}
 * @returns JSON success message
 */

require_once 'config.php';

try {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($data['id'])) {
        http_response_code(400);
        throw new Exception('Book id is required');
    }
    
    $id = intval($data['id']);
    
    if ($id <= 0) {
        http_response_code(400);
        throw new Exception('Invalid book id');
    }
    
    $stmt = $conn->prepare('DELETE FROM books WHERE id=?');
    $stmt->bind_param('i', $id);
    
    if ($stmt->execute()) {
        if ($stmt->affected_rows > 0) {
            http_response_code(200);
            echo json_encode([
                'success' => true,
                'message' => 'Book deleted successfully'
            ]);
        } else {
            http_response_code(404);
            echo json_encode([
                'success' => false,
                'message' => 'Book not found'
            ]);
        }
    } else {
        throw new Exception($stmt->error);
    }
    
    $stmt->close();
    
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Error: ' . $e->getMessage()
    ]);
}

$conn->close();
?>
