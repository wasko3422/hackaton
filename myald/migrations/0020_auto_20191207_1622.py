# Generated by Django 2.2 on 2019-12-07 16:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myald', '0019_auto_20191207_1618'),
    ]

    operations = [
        migrations.RenameField(
            model_name='client',
            old_name='first_name',
            new_name='name',
        ),
        migrations.RemoveField(
            model_name='client',
            name='last_name',
        ),
        migrations.RemoveField(
            model_name='client',
            name='middle_name',
        ),
        migrations.RemoveField(
            model_name='client',
            name='phone',
        ),
        migrations.AlterField(
            model_name='car',
            name='vin',
            field=models.CharField(db_index=True, max_length=64),
        ),
    ]
