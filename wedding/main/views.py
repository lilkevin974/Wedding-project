import json

from django.http import HttpResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from django.shortcuts import render
from main.models import Confirmation
from main.send_email import send_html_email

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


    return render(request, 'main/index.html')