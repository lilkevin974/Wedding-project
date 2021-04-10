import json

from django.http import HttpResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from django.shortcuts import render
from main.models import Confirmation, TwilioSms
from django.core.mail import send_mail
from main.send_email import send_html_email
from django.views.decorators.csrf import csrf_exempt

# Create your views here.

@ensure_csrf_cookie
def index(request):

    if request.method == 'POST':
        data = json.loads(request.body)
        if data['children'] =='':
            data['children']=0
        if data['adults']=='':
            data['adults']=1
        print(Confirmation.objects.all())
        print(data)
        Confirmation.objects.create(email=data['email'], 
                                    first_name=data['first_name'],
                                    last_name=data['last_name'],
                                    adults=data['adults'],
                                    children=data['children'],
                                    message=data['message'])
        
        #return HttpResponse(data['first_name'])
        send_html_email(
            subject = "Notre Mariage - Confirmation de présence reçue",
            template_name = 'main/email.html',
            sender = 'Annaëlle et Kévin <contact@annaelle-et-kevin.fr>',
            to_list = [data['email']],
        )
        send_mail(
            f'Confirmation de {data["last_name"]} {data["first_name"]}',
            f'Confirmation :\nInvité : {data["last_name"]} {data["first_name"]}\nNombre d\'adultes : {data["adults"]}\nNombre d\'enfants : {data["children"]}\nMessage : {data["message"]}',
            'Annaëlle et Kévin <contact@annaelle-et-kevin.fr>',
            ['lilkevin@hotmail.fr'],
            fail_silently=True,
        )

    return render(request, 'main/index.html')

@csrf_exempt
def smsstatus(request):
    if request.method=="POST":
        """ message_sid = request.POST.get('MessageSid') """
        message_status = request.POST.get('MessageStatus')
        to = request.POST.get('To')
        TwilioSms.objects.filter(number=to).update(status=message_status)

        return HttpResponse(status=200)