from django.shortcuts import render
from django.core.mail import send_mail
from django.conf import settings


# TODO normal service for send emails


def email(request):

    subject = 'test'
    message = 'test'
    recipient_list = ['panow.egor2018@gmail.com']
    
    send_mail(subject, message, settings.EMAIL_HOST_USER, recipient_list)

    return '321'
