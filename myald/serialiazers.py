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


class OrderSerializer:

    def serialize(self, order):

        jobs = [i.job_type.name for i in order.jobs.all()]
        
        return {
            'order_id': order.id,
            'car': {
                'make': order.contract.car.model.make,
                'model': order.contract.car.model.model,
                'car_license_plate': order.contract.car.license_plate_number,
            },
            'order': {
                'mileage': order.mileage,
                'jobs': jobs,
                'dealer_name': order.dealer.name,
                'created_at': order.created_at,
                'date_expected': order.date_expected,
                'status': order.status,
            }
        }


    def deserialize(self, data):
        pass


class JobsDoneSerializer:

    def serialize(self, job):

        return {
            'job_done_id': job.id,
            'car': {
                'make': job.contract.car.model.make,
                'model': job.contract.car.model.model,
                'car_license_plate': job.contract.car.license_plate_number,
            },
            'job_done': {
                'mileage': job.mileage,
                'jobs': job.jobs,
                'dealer_name': job.dealer.name,
                'date': job.date,
            }
        }
