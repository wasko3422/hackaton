# Generated by Django 2.2 on 2019-12-08 11:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myald', '0028_auto_20191208_0941'),
    ]

    operations = [
        migrations.AddField(
            model_name='dealer',
            name='phone',
            field=models.CharField(default='-', max_length=64),
            preserve_default=False,
        ),
    ]