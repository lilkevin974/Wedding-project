import environ
from django.db import models
from twilio.rest import Client
# Create your models here.

env = environ.Env()
environ.Env.read_env()
# Create your models here.

class TwilioSms(models.Model):

    CATEGORY= (
        ('C', 'Créé'),
        ('I1', 'Invitation 1'),
        ('I2', 'Invitation 2'),
    )

    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=20)
    surname = models.CharField(max_length=20)
    category = models.CharField(max_length=2, choices=CATEGORY)
    number = models.CharField(max_length=20)
    status = models.CharField(max_length=20, blank=True)

    def save(self, *args, **kwargs):

        account_sid = env('TWILIO_ACCOUNT_SID')
        auth_token = env('TWILIO_AUTH_TOKEN')

        client = Client(account_sid, auth_token)
        if self.category == 'I1':
            client.api.account.messages.create(
                to=f"{self.number}",
                from_="+14153197987",
                status_callback='http://www.annaelle-et-kevin.fr/sms/status',
                body=f"Hello {self.surname}!")
        elif self.category == 'I2':
            client.api.account.messages.create(
                to=f"{self.number}",
                from_="+14153197987",
                status_callback='http://www.annaelle-et-kevin.fr/sms/status',
                body="Hello send!")

        super().save(*args, **kwargs)
    
    def __str__(self):
        if self.category == 'I1' or self.category == 'I2':
            return f"L'invitation {self.category} a été envoyée à {self.last_name} {self.first_name}"
        else :
            return f"{self.last_name} {self.first_name} a été ajouté"

class Confirmation(models.Model):
    family=models.OneToOneField(TwilioSms, on_delete=models.PROTECT, null=True)
    email=models.CharField(max_length=50)
    last_name=models.CharField(max_length=20)
    first_name=models.CharField(max_length=20)
    adults=models.IntegerField()
    children=models.IntegerField()
    message=models.CharField(max_length=200)