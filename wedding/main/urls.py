from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('status',views.smsstatus, name='SmsStatus')
]