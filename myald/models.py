from django.db import models
from django.contrib.postgres.fields import JSONField


class ModelTimestamps(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Client(ModelTimestamps):
    name = models.CharField(max_length=64)
    client_number = models.CharField(max_length=128)

    def __str__(self):
        return self.name


class Model(ModelTimestamps):
    make = models.CharField(max_length=128)
    model = models.CharField(max_length=128)
    maintaince_kms = models.IntegerField()
    maintaince_years = models.IntegerField()
    logo = models.CharField(max_length=256)

    def __str__(self):
        return '{} - {}'.format(self.model, self.make)


class Car(ModelTimestamps):
    model = models.ForeignKey(Model, on_delete=models.PROTECT, related_name='cars')
    license_plate_number = models.CharField(max_length=128)
    sold_at = models.DateTimeField()
    vin = models.CharField(max_length=64, db_index=True)

    last_service_mileage = models.IntegerField(null=True, blank=True)
    last_service_date = models.DateTimeField(null=True, blank=True)
    next_service_mileage = models.IntegerField(null=True, blank=True)
    next_service_date = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.license_plate_number 


class City(models.Model):
    name = models.CharField(max_length=128)

    class Meta:

        verbose_name_plural = 'Cities'

    def __str__(self):
        return self.name


class Dealer(ModelTimestamps):
    name = models.CharField(max_length=256)
    city = models.ForeignKey(City, on_delete=models.PROTECT, related_name="dealers")
    lattitude = models.FloatField()
    longtitude = models.FloatField()
    email = models.CharField(max_length=128)
    is_priority = models.BooleanField()
    address = models.CharField(max_length=256)

    def __str__(self):
        return self.name


class DealersModels(ModelTimestamps):
    dealer = models.ForeignKey(Dealer, on_delete=models.PROTECT, related_name='dealers_models')
    model = models.ForeignKey(Model, on_delete=models.PROTECT)

    class Meta:

        verbose_name_plural = 'Dealers Models'


class Contract(ModelTimestamps):
    client = models.ForeignKey(Client, on_delete=models.PROTECT, related_name="contracts")
    car = models.OneToOneField(Car, on_delete=models.PROTECT, related_name='contract')
    contract_number = models.CharField(max_length=128)


class Order(ModelTimestamps):

    COMBINATIONS = [
        ('1', '1'),
        ('2', '2')
    ]   

    STATUSES = [
        ('created', 'created'),
        ('in progress', 'in progress'),
        ('sent', 'sent')
    ]

    contract = models.ForeignKey(Contract, on_delete=models.PROTECT)
    client = models.ForeignKey(Client, on_delete=models.PROTECT)
    dealer = models.ForeignKey(Dealer, on_delete=models.PROTECT, null=True, blank=True)
    city = models.ForeignKey(City, on_delete=models.PROTECT)
    phone = models.CharField(max_length=32)
    email = models.CharField(max_length=64)
    first_name = models.CharField(max_length=32)
    last_name = models.CharField(max_length=32)
    comment = models.CharField(max_length=512, blank=True, null=True)
    mileage = models.IntegerField(blank=True, null=True)
    date_expected = models.DateTimeField(null=True)
    part_of_day_expected = models.CharField(max_length=1, choices=COMBINATIONS)
    is_auto_sending = models.BooleanField(default=False)
    sent_at = models.DateTimeField(null=True)
    status = models.CharField(max_length=32, choices=STATUSES)

    def __str__(self):
        return str(self.id)


class JobType(models.Model):
    name = models.CharField(max_length=64)
    is_main_service = models.BooleanField()


    def __str__(self):
        return self.name


class OrdersJobType(models.Model):
    job_type = models.ForeignKey(JobType, on_delete=models.PROTECT)
    order = models.ForeignKey(Order, on_delete=models.PROTECT, related_name='jobs')


    def __str__(self):
        return '{} -> {}'.format(self.order, self.job_type)


class JobsDone(ModelTimestamps):
    car = models.ForeignKey(Car, on_delete=models.PROTECT)
    client = models.ForeignKey(Client, on_delete=models.PROTECT)
    dealer = models.ForeignKey(Dealer, on_delete=models.PROTECT)
    contract = models.ForeignKey(Contract, on_delete=models.PROTECT)
    mileage = models.IntegerField()
    date = models.DateTimeField()

    class Meta:

        verbose_name_plural = 'Jobs Done'
