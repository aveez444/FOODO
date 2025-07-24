from django.urls import path
from .views import OrderCreateView, OrderListView, OrderDetailView, AdminOrderListView, AdminOrderUpdateView

urlpatterns = [
    path('orders/', OrderListView.as_view(), name='order-list'),
    path('orders/create/', OrderCreateView.as_view(), name='order-create'),
    path('orders/<int:pk>/', OrderDetailView.as_view(), name='order-detail'),
    path('admin/orders/', AdminOrderListView.as_view(), name='admin-order-list'),
    path('admin/orders/<int:pk>/', AdminOrderUpdateView.as_view(), name='admin-order-update'),
]