from django.db import models
from django.contrib.postgres.fields import JSONField


class ModelTimestamps(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Client(ModelTimestamps):
    phone = models.CharField(max_length=32)
    email = models.CharField(max_length=256, blank=True)
    first_name = models.CharField(max_length=64)
    middle_name = models.CharField(max_length=64, blank=True)
    last_name = models.CharField(max_length=64)


class Car(ModelTimestamps):
    model = models.ForeignKey(Model, on_delete=models.PROTECT)
    license_plate_number = models.CharField(max_length=128)
    sold_at = models.DateTimeField()


class Model(ModelTimestamps):
    make = models.CharField(max_length=128)
    model = models.CharField(max_length=128)
    maintaince_kms = models.IntegerField()
    maintaince_years = models.IntegerField()


class City(models.Model):
    name = models.CharField(max_length=128)


class Dealer(ModelTimestamps):
    city = models.ForeignKey(City, on_delete=models.PROTECT, related_name="dealers")
    is_priority = models.BooleanField()
    address = models.CharField(max_length=256)


class DealersModels(ModelTimestamps):
    dealer = models.OneToOneField(Dealer, on_delete=models.PROTECT)
    model = models.OneToOneField(Model, on_delete=models.PROTECT)


class Contract(ModelTimestamps):
    client = models.ForeignKey(Client, on_delete=models.PROTECT, related_name="contracts")
    car = models.OneToOneField(Car, on_delete=models.PROTECT)


class OrdersJobType(models.Model):
    pass


class Order(ModelTimestamps):

    COMBINATIONS = [
        ('1', '1'),
        ('2', '2')
    ]   

    contract = models.OneToOneField(Contract, on_delete=models.PROTECT)
    client = models.OneToOneField(Client, on_delete=models.PROTECT)
    dealer = models.OneToOneField(Dealer, on_delete=models.PROTECT, null=True, blank=True)
    city = models.OneToOneField(City, on_delete=models.PROTECT)
    comment = models.CharField(max_length=512, blank=True)
    mileage = models.IntegerField(blank=True, null=True)
    date_expected = models.DateTimeField(null=True)
    part_of_day_expected = models.CharField(max_length=1, choices=COMBINATIONS)
    is_auto_sending = models.BooleanField(default=False)
    sent_at = models.DateTimeField(null=True)
    order_job_types = models.ForeignKey(OrdersJobType, on_delete=models.PROTECT)


class JobType(models.Model):
    name = models.CharField(max_length=64)
    order_job_types = models.ForeignKey(OrdersJobType, on_delete=models.PROTECT)

class JobsDone(ModelTimestamps):
    car = models.ForeignKey(Car, on_delete=models.PROTECT)
    client = models.ForeignKey(Client, on_delete=models.PROTECT)
    dealer = models.ForeignKey(Dealer, on_delete=models.PROTECT)
    mileage = models.IntegerField()
    date = models.DateTimeField()
    jobs = JSONField()
