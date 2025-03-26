<?php

require_once "config.php";

function SendMail(string $to, string $subject, string $message): bool
{
    $from = SMTP_FROM;

    // To send HTML mail, the Content-type header must be set
    $headers[] = 'MIME-Version: 1.0';
    $headers[] = 'Content-type: text/html; charset=iso-8859-1';

    // Additional headers
    $headers[] = "To: $to";
    $headers[] = "From: Johannes Kirchner <$from>";

    if (mail($to, $subject, $message, implode("\r\n", $headers))) {
        return true;
    } else {
        return false;
    }
}
