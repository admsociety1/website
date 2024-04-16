<?php
if (empty($_POST["email"]) || empty($_POST["registrationNo"])) {
    header("location:index.html?empty=1");
} else {
    $email = $_POST["email"];
    $registration = $_POST["registrationNo"];
    $conn = mysqli_connect("localhost", "root", "@Harsh321", "adm");
    if ($conn) {
        $query = "select * from forms where email='$email' AND registrationNumber='$registration'";
        $result = mysqli_query($conn, $query);
        if ($result && mysqli_num_rows($result) > 0) {
            echo "success";
            header("location:cert.html");
        } else {
            echo "
        <script>
        alert('INVALID REGISTRATION!!');
        document.location.href='index.html';
        </script>";			
        }
    } else {
        header("location:index.php?db_error");
    }
}
?>