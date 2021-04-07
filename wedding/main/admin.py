from django.contrib import admin
from main.models import Confirmation, TwilioSms

# Register your models here.
admin.site.register(Confirmation)
admin.site.register(TwilioSms)