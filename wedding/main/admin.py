from django.contrib import admin
from main.models import Confirmation, TwilioSms

# Register your models here.


class SmsAdmin(admin.ModelAdmin):
    list_display = ('fullname', 'surname', 'number', 'category', 'status')
    list_editable = ('number','category')
    list_filter = ['category','status']

    def fullname(self,obj):
        return "{} {}".format(obj.last_name, obj.first_name)

class ConfirmationAdmin(admin.ModelAdmin):
    list_display = ('fullname','family', 'email', 'adults', 'children')

    def fullname(self,obj):
        return "{} {}".format(obj.last_name, obj.first_name)

admin.site.register(TwilioSms, SmsAdmin)
admin.site.register(Confirmation, ConfirmationAdmin)
