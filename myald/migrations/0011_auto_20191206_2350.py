# Generated by Django 2.2 on 2019-12-06 23:50

from django.db import migrations
from myald.models import City, Model, Dealer, DealersModels, Car, Client, Contract, JobType
from datetime import datetime


def generate_data(apps, schema_editor):
    city = City(name='Moscow')
    city.save()

    model = Model(make='bmv', model='X5', maintaince_kms=10, maintaince_years=10, logo='test')
    model.save()

    dealer = Dealer(city=city, name='Рольф', is_priority=True, address='Test')
    dealer.save()

    dm = DealersModels(dealer=dealer, model=model)
    dm.save()

    car = Car(model=model, license_plate_number='ab431c', sold_at=datetime.now())
    car.save()

    client = Client(phone='79994901759', first_name='Evgeniy', last_name='Smirnov')
    client.save()

    contract = Contract(car=car, client=client)
    contract.save()

    jb = JobType(name='ТО', is_main_service=True)
    jb.save()
    

class Migration(migrations.Migration):

    dependencies = [
        ('myald', '0010_dealer_name'),
    ]

    operations = [
        migrations.RunPython(generate_data)
    ]
