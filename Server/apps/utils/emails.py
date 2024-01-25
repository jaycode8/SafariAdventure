
import smtplib
from email.message import EmailMessage
from dotenv import load_dotenv
import os

load_dotenv()
sender = os.getenv("sender")
password = os.getenv("password")


def transporter(receiver, otp):
    service, message = set_message()
    message["Subject"] = "Account verification"
    message["From"] = sender
    message["To"] = receiver
    message.set_content(f"Verification code is {otp}")
    try:
        service.send_message(message)
    except Exception as e:
        return False
    service.quit()
    return True

def send_messages(fullname, sender_email, msg):
    service, message = set_message()
    message["Subject"] = f"You have a message from {fullname}-{sender_email}"
    message["From"] = sender_email
    message["To"] = sender
    message.set_content(msg)
    try:
        service.send_message(message)
    except Exception as e:
        return False
    service.quit()
    instant_reply(sender_email, fullname)
    return True

def instant_reply(receiver, fullname):
    service, message = set_message()
    message["Subject"] = "Email confirmation"
    message["From"] = sender
    message["To"] = receiver
    message.set_content(f"Hello {fullname}, we have received your message.Thanks we will consider your request.")
    try:
        service.send_message(message)
    except Exception as e:
        return False
    service.quit()
    return True

def set_message():
    service = smtplib.SMTP("smtp.gmail.com", 587)
    service.starttls()
    service.login(sender, password)
    message = EmailMessage()
    return service, message

