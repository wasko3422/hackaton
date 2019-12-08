from django.urls import path
from myald import views


urlpatterns = [
    path('get-user-info', views.ClientView.as_view()),
    path('get-cities', views.CitiesView.as_view()),
    path('get-cars', views.CarsView.as_view()),
    path('get-jobs', views.JobTypesView.as_view()),
    path('get-dealers', views.DealersView.as_view()),
    path('create-order', views.CreateOrderView.as_view()),
    path('get-orders', views.OrdersView.as_view()),
    path('get-jobs-done', views.JobsDoneView.as_view()),
    path('m-auth', views.login),
    path('m-delete-order', views.DeleteOrderView.as_view()),
    path('m-update-order', views.UpdateOrderView.as_view()),
    path('m-get-orders', views.AllOrdersView.as_view()),
    path('m-update-order-status', views.ChangeStatusView.as_view()),
    path('m-send-mail', views.SendEmailView.as_view()),
]
