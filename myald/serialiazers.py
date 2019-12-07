from .models import City, JobType

class ClientSerializer:
    
    def serialize(self, client):
        return {
            'client_id': client.id,
            'name_surname': '{} {}'.format(client.first_name, client.last_name),
        }


class CitiesSerializer:

    def serialize(self):
        cities = City.objects.all()

        return [{'city_id': i.id, 'city_name': i.name} for i in cities]


class CarSerializer:
    
    def serialize(self, car):

        return {
            'contract_id': car.contract.id,
            'car_id': car.id,
            'car_make': car.model.make,
            'car_logo_url': car.model.logo,
            'car_last_service': {
                'mileage': car.last_service_mileage,
                'date': car.last_service_date,
            },
            'car_next_service': {
                'mileage': car.next_service_mileage,
                'date': car.next_service_date,
            }
        }


class JobTypesSerializer:

    def serialize(self):
        jobs = JobType.objects.all()
        return [{'job_type_id': i.id, 'job_type': i.name} for i in jobs]


class DealersSerializer:

    def serialize(self, dealer):
        return {
            'dealer_id': dealer.id,
            'dealer_name': dealer.name,
            'lattitude': 12.321321321,
            'longtitude': 13.321321321321,
            'address': dealer.address,
            'is_priority': dealer.is_priority,
        }
