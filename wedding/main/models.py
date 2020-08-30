from django.db import models
# Create your models here.

class Confirmation(models.Model):
    email=models.CharField(max_length=50)
    last_name=models.CharField(max_length=20)
    first_name=models.CharField(max_length=20)
    adults=models.IntegerField()
    children=models.IntegerField()
    message=models.CharField(max_length=200)