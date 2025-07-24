from rest_framework import serializers
from .models import Order, OrderItem
from products.models import Product  # Add this import
from products.serializers import ProductSerializer
from users.models import Address  
from users.serializers import AddressSerializer

class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    product_id = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all(), source='product', write_only=True
    )

    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'product_id', 'quantity', 'unit_price']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    delivery_address = AddressSerializer(read_only=True)
    delivery_address_id = serializers.PrimaryKeyRelatedField(
        queryset=Address.objects.all(), source='delivery_address', write_only=True
    )

    class Meta:
        model = Order
        fields = ['id', 'user', 'total_amount', 'status', 'delivery_address', 'delivery_address_id', 'items', 'payment_status', 'created_at', 'updated_at']