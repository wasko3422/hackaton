from django.contrib import admin
from django import forms
from .models import Car, City, Client, Contract, Model, Order, OrdersJobType, JobsDone, JobType, \
    Dealer, DealersModels

admin.site.register(Car)
admin.site.register(City)
admin.site.register(Client)
admin.site.register(Contract)
admin.site.register(Model)
admin.site.register(Order)
admin.site.register(OrdersJobType)
admin.site.register(JobsDone)
admin.site.register(JobType)
admin.site.register(DealersModels)
admin.site.register(Dealer)
