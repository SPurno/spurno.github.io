<?php
    if ($_SERVER["REQUEST_METHOD"] === "POST") {
        $name = $_POST["name"];
        $email = $_POST["email"];
        $message = $_POST["message"];
    
        $to = "studiodhakaltd@gmail.com"; // Replace with your email address
        $subject = "Contact Form Submission from $name";
        $headers = "From: $email";
    
        if (mail($to, $subject, $message, $headers, $name)) {
            $response = ["success" => true, "message" => "Message sent successfully!"];
        } else {
            $response = ["success" => false, "message" => "Message sending failed."];
        }
    
        echo json_encode($response);
    } else {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "Bad request"]);
    }
?>
