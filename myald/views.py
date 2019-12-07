from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from rest_framework import status
from myald import serialiazers
from .models import Client, Car, Dealer, Order, Contract, City, JobType, OrdersJobType, JobsDone
from rest_framework.views import APIView
from django.core.mail import send_mail
from hackaton.settings import ALDAVAR, EMAIL_HOST_USER
from datetime import timedelta
from dateutil import parser



class ClientView(APIView):

    def get(self, request, *args, **kwargs):
        client_id = request.GET.get('client_id')
        try:
            client = Client.objects.get(id=client_id)
        except Exception as e:
            return JsonResponse({"error": "Unknown client"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        result = serialiazers.ClientSerializer().serialize(client)
        return JsonResponse(result, status=status.HTTP_200_OK)


class CitiesView(APIView):

    def get(self, request, *args, **kwargs):
        result = serialiazers.CitiesSerializer().serialize()
        return JsonResponse(result, status=status.HTTP_200_OK, safe=False)


class CarsView(APIView):

    def get(self, request, *args, **kwargs):
        client_id = request.GET.get('client_id')
        if client_id:
            try:
                cars = Car.objects.filter(contract__client__id=client_id)
            except Exception as e:
                return JsonResponse({"error": "Unknown client"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            result = list([serialiazers.CarSerializer().serialize(i) for i in cars])
            return JsonResponse(result, safe=False, status=status.HTTP_200_OK)

        else: 
            contract_id = request.GET.get('contract_id')

            try:
                car = Car.objects.get(contract__id=contract_id)
            except Exception as e:
                return JsonResponse({"error": "Unknown contract"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            result = [serialiazers.CarSerializer().serialize(car)]
            return JsonResponse(result, safe=False, status=status.HTTP_200_OK)

        return JsonResponse({"error": "Unknown param"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class JobTypesView(APIView):

    def get(self, request, *args, **kwargs):
        result = serialiazers.JobTypesSerializer().serialize()
        return JsonResponse(result, safe=False, status=status.HTTP_200_OK)


class DealersView(APIView):

    def get(self, request, *args, **kwargs):
        city_id = request.GET.get('city_id')
        car_id = request.GET.get('car_id')
        dealers = Dealer.objects.filter(dealers_models__model__cars__id=car_id, city__id=city_id)
        result = [serialiazers.DealersSerializer().serialize(i) for i in dealers]
        return JsonResponse(result, safe=False, status=status.HTTP_200_OK)


class CreateOrderView(APIView):

    def post(self, request):
        data = request.data

        client_id, contract_id, city_id, dealer_id = data.get('client_id'), data.get('contract_id'), data.get('city_id'), data.get('dealer_id')
        name, surname, phone, email = data.get('name'), data.get('surname'), data.get('phone'), data.get('email')
        if not (client_id and contract_id and city_id and name and surname and phone and email):
            return JsonResponse({"error": "required params are missing"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        client = get_or_none(Client, id=client_id)
        contract = get_or_none(Contract, id=contract_id)
        city = get_or_none(City, id=city_id)
        dealer = get_or_none(Dealer, id=dealer_id)

        if not (client, contract, city):
            return JsonResponse({"error": "Unknown car or city or client"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        order = Order(
            contract=contract, client=client, city=city, 
            dealer=dealer, comment=data.get('comment', ''), 
            date_expected=data.get('date_expected'),
            part_of_day_expected=data.get('part_of_day_expected', '1'),
            mileage=data.get('mileage'), status=data.get('status', 'created'),
            is_auto_sending=False, last_name=surname, first_name=name, phone=phone, email=email)

        order.save()

        is_main_service = False
        job_types = data.get('job_types', [])
        mileage = data.get('mileage')
        part_of_day_expected = data.get('part_of_day_expected')
        date_expected = data.get('date_expected')

        if date_expected:
            date_expected = parser.parse(date_expected)

        if not (job_types and mileage and part_of_day_expected and date_expected and dealer):
            send_mail('text 2', 'text 2', EMAIL_HOST_USER, [email,ALDAVAR])
            return HttpResponse(status=status.HTTP_200_OK)

        for i in job_types:
            job_type = get_or_none(JobType, id=i)
            if job_type:
                if job_type.is_main_service:
                    is_main_service = True
                ojm = OrdersJobType(
                    order=order,
                    job_type=job_type,
                )
                ojm.save()

        if not is_main_service:
            order.status = 'sent'
            order.is_auto_sending = True
            order.save()
            send_mail('text 1', 'text 1', EMAIL_HOST_USER, [email, ALDAVAR, dealer.email])
            return HttpResponse(status=status.HTTP_200_OK)

        car = contract.car

        if car.next_service_mileage and car.next_service_date:
            if order.date_expected >= car.next_service_date - timedelta(days=30) or \
                        (order.mileage >= car.next_service_mileage - 500 and order.mileage <= car.next_service_mileage + 500):
                order.status = 'sent'
                order.is_auto_sending = True
                order.save()
                send_mail('text 1', 'text 1', EMAIL_HOST_USER, [email, ALDAVAR, dealer.email])
                return HttpResponse(status=status.HTTP_200_OK)

            send_mail('text 2', 'text 2', EMAIL_HOST_USER, [email, ALDAVAR])
            return HttpResponse(status=status.HTTP_200_OK)
        model = car.model
        if  order.date_expected >= car.sold_at + timedelta(days=365*model.maintaince_years - 30) \
            or (order.mileage >= model.maintaince_kms - 500 and order.mileage <= model.maintaince_kms + 500):
            order.status = 'sent'
            order.is_auto_sending = True
            order.save()
            send_mail('text 1', 'text 1', EMAIL_HOST_USER, [email,ALDAVAR, dealer.email])
        send_mail('text 2', 'text 2', EMAIL_HOST_USER, [email,ALDAVAR])
        return HttpResponse(status=status.HTTP_200_OK)


class OrdersView(APIView):

    def get(self, request, *args, **kwargs):
        client_id = request.GET.get('client_id')

        if client_id:
            orders = Order.objects.filter(client_id=client_id)
            result = [serialiazers.OrderSerializer().serialize(i) for i in orders]
            return JsonResponse(result, safe=False, status=status.HTTP_200_OK)
        else:
            contract_id = request.GET.get('contract_id')
            print(contract_id)
            orders = Order.objects.filter(contract=contract_id)
            result = [serialiazers.OrderSerializer().serialize(i) for i in orders]
            return JsonResponse(result, safe=False, status=status.HTTP_200_OK)

        return JsonResponse({"error": "Unknown param"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)   

class JobsDoneView(APIView):

    def get(self, request, *args, **kwargs):
        client_id = request.GET.get('client_id')

        if client_id:
            jobs = JobsDone.objects.filter(client_id=client_id)
            result = [serialiazers.JobsDoneSerializer().serialize(i) for i in jobs]
            return JsonResponse(result, safe=False, status=status.HTTP_200_OK)
        else: 
            contract_id = request.GET.get('contract_id')
            jobs = JobsDone.objects.filter(contract__id=contract_id)
            result = [serialiazers.JobsDoneSerializer().serialize(i) for i in jobs]
            return JsonResponse(result, safe=False, status=status.HTTP_200_OK)

        return JsonResponse({"error": "Unknown param"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)   



class UpdateOrderView(APIView):

    def post(self, request):
        data = request.data
        order_id,  = data.get('order_id')
        s = data.get('sent_mail', False)
        data.pop('jobs')
        order = get_or_none(Order, id=order_id)

        if not order:
            return JsonResponse({"error": "Unknown order"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        order.update(**data)
        order.save()

        if s:
            send_mail('text 1', 'text 1', EMAIL_HOST_USER, [ALDAVAR, dealer.email])

        return HttpResponse(status=status.HTTP_200_OK)
        

class DeleteOrderView(APIView):
    def get(self, request, *args, **kwargs):
        order_id = request.GET.get('order_id')
        order = get_or_none(Order, id=order_id)
        if order:
            order.delete()
        return HttpResponse(status=status.HTTP_200_OK)



class AllOrdersView(APIView):

    def get(self, request, *args, **kwargs):

        orders = Order.objects.all()

        result = [serialiazers.AnotherOrderSerializer().serialize(i) for i in orders]
        return JsonResponse(result, safe=False, status=status.HTTP_200_OK)


#TODO auth
def login(request):
    return HttpResponse(status=status.HTTP_200_OK)


def get_or_none(model, *args, **kwargs):
    try:
        return model.objects.get(*args, **kwargs)
    except model.DoesNotExist:
        return None   
