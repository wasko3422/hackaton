# Generated by Django 2.2 on 2019-12-08 09:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myald', '0026_auto_20191208_0808'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='sent_at',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
