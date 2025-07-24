from rest_framework import serializers
from .models import Wishlist
from products.serializers import ProductSerializer
from products.models import Product  # Add this import


class WishlistSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    product_id = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all(), source='product', write_only=True
    )

    class Meta:
        model = Wishlist
        fields = ['id', 'user', 'product', 'product_id', 'added_at']