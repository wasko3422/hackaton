from django.urls import path
from myald import views


urlpatterns = [
    path('get-user-info', views.ClientView.as_view()),
    path('get-cities', views.CitiesView.as_view()),
    path('get-cars', views.CarsView.as_view()),
    path('get-jobs', views.JobTypesView.as_view()),
    path('get-dealers', views.DealersView.as_view())
]