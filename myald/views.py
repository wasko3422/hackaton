from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import status
from myald import serialiazers
from .models import Client, Car, Dealer
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
            car = Car.objects.get(contract__client__id=client_id)
        except Exception as e:
            return JsonResponse({"error": "Unknown client"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        result = serialiazers.CarSerializer().serialize(car)
        return JsonResponse(result, status=status.HTTP_200_OK)



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

        client_id, car_id, city_id, dealer_id = data.get('client_id'), data.get('car_id'), data.get('city_id'), data.get('dealer_id'),
        client = get_or_none(Client, id=data.get('client_id', ''))
        if not client:
            return JsonResponse({"error": "Unknown client"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        








def get_or_none(model, *args, **kwargs):
    try:
        return model.objects.get(*args, **kwargs)
    except model.DoesNotExist:
        return None   
