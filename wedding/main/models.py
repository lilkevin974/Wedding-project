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
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    surname = models.CharField(max_length=30)
    category = models.CharField(max_length=30)
    number = models.CharField(max_length=30)

    def save(self, *args, **kwargs):

        account_sid = env('TWILIO_ACCOUNT_SID')
        auth_token = env('TWILIO_AUTH_TOKEN')

        client = Client(account_sid, auth_token)

        client.api.account.messages.create(
            to=f"{self.number}",
            from_="+14153197987",
            body="Hello there!")

        super().save(*args, **kwargs)
