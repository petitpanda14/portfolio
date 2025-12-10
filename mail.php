<?php

//////////////////////////////////////////////
// Auteur : James Benone                    //
// Description : Gère l'envoie des emails   //
// Date de modification : 10/12/2025        //
//////////////////////////////////////////////

include "./smtp.php";
require "./mail.inc.php";

function sendMail($email, $nom, $message)
{
    try
    {
        $mail = new PHPMailer(true);

        // Paramètres
        // $mail->SMTPDebug    = SMTP::DEBUG_SERVER;
        $mail->isSMTP();
        $mail->SMTPAuth     = true;

        // Variables
        $mail->Host         = SMTP_HOST;
        $mail->Port         = SMTP_PORT;
        $mail->Username     = SMTP_USER;
        $mail->Password     = SMTP_PASS;

        // Préparation pour l'envoie
        $mail->setFrom(SMTP_USER, 'Formulaire de contact');
        $mail->addAddress(SMTP_TO, 'X');

        // Préparation du contenu
        $template = file_get_contents('email_template_unrecon.html');
        $template = str_replace('{{NOM_COMPLET}}', $nom, $template);
        $template = str_replace('{{EMAIL_ADDRESS}}', $email, $template);
        $template = str_replace('{{MESSAGE_CONTENT}}', $message, $template);
        $template = str_replace('{{DATE_TIME}}', date('d F Y à H:i'), $template);

        // Préparation du headers

        // Contenu
        $mail->isHTML(true);
        $mail->CharSet = PHPMailer::CHARSET_UTF8;
        $mail->Subject      = "Formulaire de contact";
        $mail->Body         = $template;
        $mail->AltBody      = "Demande de prise de contact, \nEmail : $email\nNom : $nom, \nMessage: : \n$message";

        // Envoie de l'email
        $mail->send();
        return true;
    }
    catch(\Exception $e)
    {
        // var_dump($e);
        return false;
    }
}

// On vérifie que la méthode est post
if($_SERVER["REQUEST_METHOD"] === "POST")
{
    // On récupère les input
    $phpInput = file_get_contents("php://input");
    $data = json_decode($phpInput, true);

    // On les vérifie
    $email = isset($data["email"]) ?? filter_var($data["email"], FILTER_VALIDATE_EMAIL);
    $nom = isset($data["nom"]) ?? filter_var($data["nom"], FILTER_SANITIZE_STRING);
    $message = isset($data["message"]) ?? filter_var($data["message"], FILTER_SANITIZE_STRING);

    // Si il ne manque rien
    if ($email && $nom && $message)
    {
        // On envoie le mail
        // Si il y a un problème, on affiche une 500
        if (sendMail($data["email"], $data["nom"], $data["message"]))
            echo json_encode(["message" => "Le formulaire a bien été envoyé", "status" => "ok"]);
        else
            http_response_code(500);
    }
    else
    {
        http_response_code(400);
        echo json_encode(["message" => "Un des champ est manquant", "status" => "ko"]);
    }
}
else
{
    http_response_code(405);
}