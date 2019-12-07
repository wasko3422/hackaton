
from django.db import migrations
from myald.models import City, JobsDone, Model, Dealer, DealersModels, Car, Client, Contract, JobType, Order
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

    order = Order(contract=contract, comment='test', client=client, dealer=dealer, city=city, mileage=100, date_expected=datetime.now(), part_of_day_expected='1')
    order.save()

    jobdone = JobsDone(car=car, client=client, dealer=dealer, contract=contract, mileage=300, date=datetime.now(), jobs=['bam', 'bam'])
    jobdone.save()


class Migration(migrations.Migration):

    dependencies = [
        ('myald', '0014_jobsdone_contract'),
    ]

    operations = [
        migrations.RunPython(generate_data)
    ]
