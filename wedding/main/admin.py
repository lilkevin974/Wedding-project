from django.contrib import admin
from main.models import Confirmation, TwilioSms

# Register your models here.


class SmsAdmin(admin.ModelAdmin):
    list_display = ('fullname', 'surname', 'number', 'category','sms','status')
    list_editable = ('number','category','sms')
    list_filter = ['category','sms','status']

    def fullname(self,obj):
        return "{} {}".format(obj.last_name, obj.first_name)

class ConfirmationAdmin(admin.ModelAdmin):
    list_display = ('fullname','family', 'email', 'adults', 'children')
    list_editable = ['family']

    def fullname(self,obj):
        return "{} {}".format(obj.last_name, obj.first_name)

admin.site.register(TwilioSms, SmsAdmin)
admin.site.register(Confirmation, ConfirmationAdmin)
