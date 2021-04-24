import environ
from django.db import models
from twilio.rest import Client
# Create your models here.

env = environ.Env()
environ.Env.read_env()
# Create your models here.

class TwilioSms(models.Model):

    SMS= (
        ('C', 'Créé'),
        ('I1', 'Invitation 1'),
        ('I2', 'Invitation 2'),
    )
    CATEGORY= (
        ('A', 'Amis'),
        ('J', 'Famille JAGUERNATE'),
        ('R', 'Famille ROBERT'),
    )
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=20)
    surname = models.CharField(max_length=20)
    sms = models.CharField(max_length=2, choices=SMS)
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
                from_="+33757912708",
                status_callback='http://www.annaelle-et-kevin.fr/sms/status',
                body=f"Bonjour {self.surname},\n\nNous nous disons OUI!\nNous sommes heureux de vous convier à notre mariage qui aura lieu le 27 août 2021.\n\nPour plus d'informations et afin de confirmer votre présence avant le 31 mai, rendez-vous sur notre site www.annaelle-et-kevin.fr.\n\nAnnaëlle et Kévin\n0692018205")
        elif self.category == 'I2':
            client.api.account.messages.create(
                to=f"{self.number}",
                from_="KevinEtAnna",
                status_callback='http://www.annaelle-et-kevin.fr/sms/status',
                body=f"Bonjour {self.surname},\n\nNous nous disons OUI!\nNous sommes heureux de vous convier à notre mariage qui aura lieu le 27 août 2021.\n\nPour plus d'informations et afin de confirmer votre présence avant le 31 mai, rendez-vous sur notre site www.annaelle-et-kevin.fr.\n\nAnnaëlle et Kévin\n0699100086")

        super().save(*args, **kwargs)
    
    def __str__(self):
            first_letter=str(self.first_name)[0]
            return f"{self.last_name} {first_letter}"

class Confirmation(models.Model):
    family=models.OneToOneField(TwilioSms, on_delete=models.PROTECT, null=True, blank=True)
    email=models.CharField(max_length=50)
    last_name=models.CharField(max_length=20)
    first_name=models.CharField(max_length=20)
    adults=models.IntegerField()
    children=models.IntegerField()
    message=models.CharField(max_length=200, blank=True)