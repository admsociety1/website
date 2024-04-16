<?php
use PHPMailer\PHPMailer\PHPmailer;
use PHPMailer\PHPMailer\SMTP;
// MySQL Connection
$servername = "localhost";
$username = "root";
$password = "@Harsh321";
$database = "adm";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// PHPMailer Autoloader
require 'vendor/autoload.php';
// Function to generate registration number
function generateRegistrationNumber() {
    $characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    $registrationLength = 6;
    $registrationNumber = '';

    for ($i = 0; $i < $registrationLength; $i++) {
        $randomIndex = mt_rand(0, strlen($characters) - 1);
        $registrationNumber .= $characters[$randomIndex];
    }

    return $registrationNumber;
}

// Form submission endpoint
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $yourName = $_POST['yourName'];
    $schoolCollege = $_POST['schoolCollege'];
    $city = $_POST['city'];
    $state = $_POST['state'];
    $email = $_POST['email'];

    $registrationNumber = generateRegistrationNumber();

    // Insert data into MySQL
    $sql = "INSERT INTO forms (yourName, schoolCollege, city, state, email, registrationNumber)
            VALUES ('$yourName', '$schoolCollege', '$city', '$state', '$email', '$registrationNumber')";

    if ($conn->query($sql) === TRUE) {
            // Send email
            $mail = new PHPMailer(true);
    
            try {
                //Server settings
                $mail->isSMTP();
                $mail->Host = 'smtp.gmail.com';
                $mail->SMTPAuth = true;
                $mail->Username = 'official.admsociety@gmail.com';
                $mail->Password = 'tghk eaeg gvpn hgjz';
                $mail->SMTPSecure = 'tls';
                $mail->Port = 587;
    
                //Recipients
                $mail->setFrom('official.admsociety@gmail.com');
                $mail->addAddress($email);
                $mail->addReplyTo('noreply@admsociety.org');
    
                //Content
                $mail->isHTML(true);
                $mail->Subject = 'Event Registration Successful';
                $mail->Body = "Dear $yourName,<br>
    
                    Greetings from ADM Educational and Welfare Society.
                    We are delighted to inform you that your registration on our website has been successfully completed. Welcome to ADM Education and Welfare Society! We appreciate your interest and trust in our platform.<br><br>
                    
                    Your registration number is: $registrationNumber<br><br>
                    
                    If you have any questions, concerns, or need assistance, please do not reply to this mail. Reach out to us at info@admsociety.org. We are here to assist you. We look forward to your active participation and hope that you find our platform valuable and enjoyable.<br>
    
                    Best regards,<br>
                    
                    ADM Education and Welfare Society";
    
                $mail->send();
            } catch (Exception $e) {
                echo "
                <script>
                alert('Error');
                document.location.href='index.html';
                </script>", $mail->ErrorInfo;
            }
    
        echo "
        <script>
        alert('Registration successful! Check mail.');
        document.location.href='index.html';
        </script>";
    } else {
        echo 'Error: ' . $conn->error;
    }
}
?>
