import json

from django.shortcuts import render
from django.core.mail import send_mail
from main.models import Confirmation

# Create your views here.

def index(request):

    if request.method == 'POST':
        data = json.loads(request.body)
        print(Confirmation.objects.all())
        print(data)
        Confirmation.objects.create(email=data['email'], first_name=data['first_name'],last_name=data['last_name'],adults=data['adults'],children=data['children'],message=data['message'])
        
        send_mail(
            subject = 'That’s your subject',
            message = 'That’s your message body',
            from_email = 'lilkevin@hotmail.fr',
            recipient_list = ['robert-kevin@outlook.com'],
            fail_silently = False,
        )


    return render(request, 'main/index.html')