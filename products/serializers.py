from rest_framework import serializers
from .models import Category, Product, ProductImage, Catalogue

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'description']

# In serializers.py
class ProductImageSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    
    class Meta:
        model = ProductImage
        fields = ['id', 'image', 'image_url', 'created_at']
        read_only_fields = ['created_at']
    
    def get_image(self, obj):
        if obj.image:
            return self.context['request'].build_absolute_uri(obj.image.url)
        return None

class CatalogueSerializer(serializers.ModelSerializer):
    product = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all(), allow_null=True)
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all(), allow_null=True)

    class Meta:
        model = Catalogue
        fields = ['id', 'title', 'description', 'image', 'product', 'category', 'is_active', 'created_at', 'updated_at']

class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), source='category', write_only=True
    )
    images = ProductImageSerializer(many=True, read_only=True)
    discount_percentage = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'mrp', 'selling_price', 'stock_quantity', 'category', 'category_id', 'images', 'discount_percentage', 'created_at', 'updated_at']

    def get_discount_percentage(self, obj):
        if obj.mrp and obj.selling_price and obj.mrp > obj.selling_price:
            discount = ((obj.mrp - obj.selling_price) / obj.mrp) * 100
            return round(discount, 2)
        return 0