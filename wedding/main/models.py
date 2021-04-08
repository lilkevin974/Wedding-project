import environ
from django.db import models
from twilio.rest import Client
# Create your models here.

env = environ.Env()
environ.Env.read_env()
# Create your models here.

class Confirmation(models.Model):
    email=models.CharField(max_length=50)
    last_name=models.CharField(max_length=20)
    first_name=models.CharField(max_length=20)
    adults=models.IntegerField()
    children=models.IntegerField()
    message=models.CharField(max_length=200)

class TwilioSms(models.Model):

    CATEGORY= (
        ('C', 'Create'),
        ('S1', 'First Send'),
        ('S2', 'Second Send'),
    )

    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=20)
    surname = models.CharField(max_length=20)
    category = models.CharField(max_length=2, choices=CATEGORY)
    number = models.CharField(max_length=20)

    def save(self, *args, **kwargs):

        account_sid = env('TWILIO_ACCOUNT_SID')
        auth_token = env('TWILIO_AUTH_TOKEN')

        client = Client(account_sid, auth_token)
        if self.category == 'S1':
            client.api.account.messages.create(
                to=f"{self.number}",
                from_="+14153197987",
                body=f"Hello {self.surname}!")
        elif self.category == 'S2':
            client.api.account.messages.create(
                to=f"{self.number}",
                from_="+14153197987",
                body="Hello send!")

        super().save(*args, **kwargs)
