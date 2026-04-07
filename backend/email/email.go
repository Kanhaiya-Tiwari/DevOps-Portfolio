package email

import (
	"fmt"
	"net/smtp"
	"os"
)

func SendEmail(to string, subject string, body string) error {
	// Sender details
	from := os.Getenv("GMAIL_USERNAME") // Your Gmail address
	password := os.Getenv("GMAIL_APP_PASSWORD") // Your Gmail App Password

	if from == "" || password == "" {
		return fmt.Errorf("GMAIL_USERNAME or GMAIL_APP_PASSWORD environment variables not set")
	}

	// Gmail SMTP server details
	smtpHost := "smtp.gmail.com"
	smtpPort := "587"

	// Message
	msg := []byte(
		"To: " + to + "\r\n" +
			"From: " + from + "\r\n" +
			"Subject: " + subject + "\r\n" +
			"Content-Type: text/html; charset=UTF-8\r\n" +
			"\r\n" + // Important: Separator between headers and body
			body)

	// Authenticate and send email
	auth := smtp.PlainAuth("", from, password, smtpHost)
	err := smtp.SendMail(smtpHost+":"+smtpPort, auth, from, []string{to}, msg)
	if err != nil {
		return fmt.Errorf("failed to send email: %w", err)
	}

	return nil
}
