from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from rest_framework import status
from myald import serialiazers
from .models import Client, Car, Dealer, Order, Contract, City
from rest_framework.views import APIView



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
        try:
            cars = Car.objects.filter(contract__client__id=client_id)
        except Exception as e:
            return JsonResponse({"error": "Unknown client"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        result = list([serialiazers.CarSerializer().serialize(i) for i in cars])
        return JsonResponse(result, safe=False, status=status.HTTP_200_OK)



class JobTypesView(APIView):

    def get(self, request, *args, **kwargs):
        result = serialiazers.JobTypesSerializer().serialize()
        return JsonResponse(result, safe=False, status=status.HTTP_200_OK)


class DealersView(APIView):

    def get(self, request, *args, **kwargs):
        city_id = request.GET.get('city_id')
        car_id = request.GET.get('car_id')
        try:
            dealer = Dealer.objects.get(dealers_models__model__cars__id=car_id, city__id=city_id)
        except Exception as e:
            return JsonResponse({"error": "Unknown dealer"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        result = serialiazers.DealersSerializer().serialize(dealer)
        return JsonResponse(result, status=status.HTTP_200_OK)


class CreateOrderView(APIView):

    def post(self, request):
        data = request.data

        client_id, contract_id, city_id, dealer_id = data.get('client_id'), data.get('contract_id'), data.get('city_id'), data.get('dealer_id')
        if not (client_id and contract_id and city_id):
            return JsonResponse({"error": "No car or city or client"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        client = get_or_none(Client, id=client_id)
        contract = get_or_none(Contract, id=contract_id)
        city = get_or_none(City, id=city_id)
        dealer = get_or_none(Dealer, id=dealer_id)

        if not (client, contract, city):
            return JsonResponse({"error": "Uknown car or city or client"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        order = Order(
            contract=contract, client=client, city=city, 
            dealer=dealer, comment=data.get('comment', ''), 
            date_exptected=data.get('date_expected', None),
            part_of_day_expected=date.get('part_of_day_expected', '1'))

        order.save()
        return HttpResponse(status=status.HTTP_200_OK)
        








def get_or_none(model, *args, **kwargs):
    try:
        return model.objects.get(*args, **kwargs)
    except model.DoesNotExist:
        return None   
