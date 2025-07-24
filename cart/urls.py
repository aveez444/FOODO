from django.urls import path
from .views import CartView, CartItemCreateView, CartItemUpdateDeleteView

urlpatterns = [
    path('cart/', CartView.as_view(), name='cart'),
    path('cart/add/', CartItemCreateView.as_view(), name='cart-item-create'),
    path('cart/items/<int:pk>/', CartItemUpdateDeleteView.as_view(), name='cart-item-update-delete'),
]