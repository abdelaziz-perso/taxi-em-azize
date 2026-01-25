<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

// Get JSON input
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Validate required fields
$required = ['name', 'email', 'serviceType', 'message'];
foreach ($required as $field) {
    if (empty($data[$field])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => "Le champ '$field' est requis"]);
        exit();
    }
}

// Sanitize input
$name = htmlspecialchars(strip_tags($data['name']));
$email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
$phone = isset($data['phone']) ? htmlspecialchars(strip_tags($data['phone'])) : '';
$serviceType = isset($data['serviceType']) ? htmlspecialchars(strip_tags($data['serviceType'])) : '';
$message = htmlspecialchars(strip_tags($data['message']));

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Adresse email invalide']);
    exit();
}

// Email configuration
$to = 'contact@emtaxi.fr';
$subject = "Nouvelle réservation - $serviceType - EM Taxi Touristique";
$from = "noreply@emtaxi.fr";

// Build email body
$emailBody = "Nouvelle demande de service reçue\n\n";
$emailBody .= "Nom: $name\n";
$emailBody .= "Email: $email\n";
if ($phone) {
    $emailBody .= "Téléphone: $phone\n";
}
$emailBody .= "Type de service: $serviceType\n";
$emailBody .= "\nMessage:\n$message\n";

// Email headers
$headers = "From: $from\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Send email using PHP mail() function
// mhsendmail will handle routing to MailHog automatically
$success = @mail($to, $subject, $emailBody, $headers);

if ($success) {
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Votre message a été envoyé avec succès!'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Erreur lors de l\'envoi du message. Veuillez réessayer.'
    ]);
}
?>
