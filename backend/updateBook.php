<?php
/**
 * PUT Update Book API
 * 
 * 
 * @method PUT
 * @body JSON {id, title, author, year, publisher, category}
 * @returns JSON success message
 */

require_once 'config.php';

try {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($data['id'], $data['title'], $data['author'], $data['year'], $data['publisher'], $data['category'])) {
        http_response_code(400);
        throw new Exception('All fields including id are required');
    }
    
    $id = intval($data['id']);
    $title = trim($data['title']);
    $author = trim($data['author']);
    $year = intval($data['year']);
    $publisher = trim($data['publisher']);
    $category = trim($data['category']);
    
    if (empty($title) || empty($author) || empty($publisher) || empty($category)) {
        http_response_code(400);
        throw new Exception('Fields cannot be empty');
    }
    
    $stmt = $conn->prepare('UPDATE books SET title=?, author=?, year=?, publisher=?, category=? WHERE id=?');
    $stmt->bind_param('ssissi', $title, $author, $year, $publisher, $category, $id);
    
    if ($stmt->execute()) {
        if ($stmt->affected_rows > 0) {
            http_response_code(200);
            echo json_encode([
                'success' => true,
                'message' => 'Book updated successfully'
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
