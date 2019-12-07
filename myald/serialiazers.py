from .models import City, JobType

class ClientSerializer:
    
    def serialize(self, client):
        return {
            'client_id': client.id,
            'name': client.name,
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
            'car_model': car.model.model,
            'car_logo_url': car.model.logo,
            'car_license_plate': car.license_plate_number,
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
            'lattitude': dealer.lattitude,
            'longtitude': dealer.longtitude,
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
                'dealer_name': job.dealer.name,
                'date': job.date,
            }
        }


class AnotherOrderSerializer:

    def serialize(self, order):
        jobs = [{'job_name': i.job_type.name, 'job_id': i.id} for i in order.jobs.all()]
        
        return {
            'order_id': order.id,
            'contract_id': order.contract.id,
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
                'contacts': {
                    'name': order.first_name,
                    'surname': order.last_name,
                    'phone': order.phone,
                    'email': order.email,
                }
            }
        }
