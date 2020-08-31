import json

from django.shortcuts import render
from main.models import Confirmation

# Create your views here.

def index(request):

    if request.method == 'POST':
        data = json.loads(request.body)
        print(Confirmation.objects.all())
        print(data)
        Confirmation.objects.create(email=data['email'], first_name=data['first_name'],last_name=data['last_name'],adults=data['adults'],children=data['children'],message=data['message'])
        


    return render(request, 'main/index.html')