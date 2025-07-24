from django.urls import path
from .views import CategoryListCreateView, CategoryDetailView, ProductListCreateView, ProductDetailView, ProductImageCreateDeleteView, CatalogueListCreateView, CatalogueDetailView

urlpatterns = [
    path('categories/', CategoryListCreateView.as_view(), name='category-list-create'),
    path('categories/<int:pk>/', CategoryDetailView.as_view(), name='category-detail'),
    path('products/', ProductListCreateView.as_view(), name='product-list-create'),
    path('products/<int:pk>/', ProductDetailView.as_view(), name='product-detail'),
    path('products/<int:product_id>/images/', ProductImageCreateDeleteView.as_view(), name='product-image-create-delete'),
    path('catalogues/', CatalogueListCreateView.as_view(), name='catalogue-list-create'),
    path('catalogues/<int:pk>/', CatalogueDetailView.as_view(), name='catalogue-detail'),
]