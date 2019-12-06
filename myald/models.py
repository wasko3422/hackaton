from django.db import models



class ModelTimestamps(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class JobType(models.Model):
    name = models.CharField(max_length=64)



class Client(ModelTimestamps):
    phone = models.CharField(max_length=32)
    email = models.CharField(max_length=256, blank=True)
    first_name = models.CharField(max_length=64)
    middle_name = models.CharField(max_length=64, blank=True)
    last_name = models.CharField(max_length=64)


class Car(ModelTimestamps):
    license_plate_number = models.CharField(max_length=128)
    sold_at = models.DateTimeField()

class Model(ModelTimestamps):
    car = models.ForeignKey(Car, on_delete=models.PROTECT, related_name='models')
    make = models.CharField(max_length=128)
    model = models.CharField(max_length=128)
    maintaince_kms = models.IntegerField()
    maintaince_years = models.IntegerField()


class City(models.Model):
    name = models.CharField(max_length=128)


class Dealer(ModelTimestamps):
    city = models.ForeignKey(Cities, on_delete=models.PROTECT, related_name="dealers")


class DealersModels(ModelTimestamps):
    dealer = models.OneToOneField(Dealer, on_delete=models.PROTECT)
    model = models.OneToOneField(Model, on_delete=models.PROTECT)

class Contract(ModelTimestamps):
    client = models.ForeignKey(Client, on_delete=models.PROTECT, related_name="contracts")
    car = models.OneToOneField(Car)

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
    comment = models.CharField(max_length=512)
    mileage = models.IntegerField()
    date_expected = models.DateTimeField(null=True)
    part_of_day_expected = models.CharField(choices=COMBINATIONS)
    is_auto_sending = models.BooleanField(default=False)
    sent_at = models.DateTimeField(null=True)
    order_job_types = models.ForeignKey(OrdersJobType, on_delete=models.PROTECT)


class JobType(models.Model):
    name = models.CharField(max_length=64)
    order_job_types = models.ForeignKey(OrdersJobType, on_delete=models.PROTECT)


