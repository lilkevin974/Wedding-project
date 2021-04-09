from django.contrib import admin
from main.models import Confirmation, TwilioSms

# Register your models here.
admin.site.register(Confirmation)


class SmsAdmin(admin.ModelAdmin):
    list_display('fullname', 'surname')
    list_editable('number','category')

    def fullname(self,obj):
        return "{} {}".format(obj.last_name, obj.first_name)

admin.site.register(TwilioSms, SmsAdmin)