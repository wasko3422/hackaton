# Generated by Django 2.2 on 2019-12-07 20:25

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('myald', '0021_auto_20191207_1715'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='city',
            options={'verbose_name_plural': 'Cities'},
        ),
        migrations.AlterModelOptions(
            name='dealersmodels',
            options={'verbose_name_plural': 'Dealers Models'},
        ),
        migrations.AlterModelOptions(
            name='jobsdone',
            options={'verbose_name_plural': 'Jobs Done'},
        ),
        migrations.RemoveField(
            model_name='client',
            name='email',
        ),
    ]
