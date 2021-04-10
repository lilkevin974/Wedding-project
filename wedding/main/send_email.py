from django.core.mail import send_mail, EmailMessage
from django.template.loader import render_to_string
from django.conf import settings

def send_html_email(to_list, subject, template_name, first_name, context='', sender=settings.DEFAULT_FROM_EMAIL):
    msg_html = render_to_string(template_name, first_name)
    msg = EmailMessage(subject=subject, body=msg_html, from_email=sender, bcc=to_list)
    msg.content_subtype = "html"  # Main content is now text/html
    return msg.send()





