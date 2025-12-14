<?php
/**
 * POST Add Book API
 * 
 * 
 * @method POST
 * @body JSON {title, author, year, publisher, category}
 * @returns JSON success message with new book id
 */

require_once 'config.php';

try {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($data['title'], $data['author'], $data['year'], $data['publisher'], $data['category'])) {
        http_response_code(400);
        throw new Exception('All fields are required');
    }
    
    $title = trim($data['title']);
    $author = trim($data['author']);
    $year = intval($data['year']);
    $publisher = trim($data['publisher']);
    $category = trim($data['category']);
    
    if (empty($title) || empty($author) || empty($publisher) || empty($category)) {
        http_response_code(400);
        throw new Exception('Fields cannot be empty');
    }
    
    $stmt = $conn->prepare('INSERT INTO books (title, author, year, publisher, category) VALUES (?, ?, ?, ?, ?)');
    $stmt->bind_param('ssiss', $title, $author, $year, $publisher, $category);
    
    if ($stmt->execute()) {
        http_response_code(201);
        echo json_encode([
            'success' => true,
            'message' => 'Book added successfully',
            'id' => $conn->insert_id
        ]);
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
