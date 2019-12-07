from django.contrib import admin
from django import forms
from .models import Car, City, Client, Contract, Model, Order, OrdersJobType, JobsDone, JobType, \
    Dealer, DealersModels


class OrderForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        if self.fields['status'] == 'sent':
            self.fields['status'].disable =True

class OrderAdmin(admin.ModelAdmin):

    exclude=("is_auto_sending",)

    form = OrderForm


admin.site.register(Car)
admin.site.register(City)
admin.site.register(Client)
admin.site.register(Contract)
admin.site.register(Model)
admin.site.register(Order, OrderAdmin)
admin.site.register(OrdersJobType)
admin.site.register(JobsDone)
admin.site.register(JobType)
admin.site.register(DealersModels)
admin.site.register(Dealer)
