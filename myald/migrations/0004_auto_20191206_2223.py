# Generated by Django 2.2 on 2019-12-06 22:23

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('myald', '0003_auto_20191206_2108'),
    ]

    operations = [
        migrations.AlterField(
            model_name='contract',
            name='car',
            field=models.OneToOneField(on_delete=django.db.models.deletion.PROTECT, related_name='contract', to='myald.Car'),
        ),
    ]