from django.contrib import admin
from .models import Category, Product, ProductImage, Catalogue

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'created_at']

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'mrp', 'selling_price', 'stock_quantity', 'category', 'created_at']

@admin.register(ProductImage)
class ProductImageAdmin(admin.ModelAdmin):
    list_display = ['product', 'image_url', 'created_at']

@admin.register(Catalogue)
class CatalogueAdmin(admin.ModelAdmin):
    list_display = ['title', 'product', 'category', 'is_active', 'created_at']