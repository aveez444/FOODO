from rest_framework import generics, permissions
from .models import Category, Product, ProductImage, Catalogue
from .serializers import CategorySerializer, ProductSerializer, ProductImageSerializer, CatalogueSerializer

class CategoryListCreateView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class CategoryDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    # permission_classes = [permissions.IsAdminUser]

class ProductListCreateView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = []  # Temporarily open for development
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = []  # Temporarily open for development
    # permission_classes = [permissions.IsAdminUser]


class ProductImageCreateDeleteView(generics.ListCreateAPIView, generics.DestroyAPIView):
    serializer_class = ProductImageSerializer
    permission_classes = []  # Temporarily open for development
    
    def get_queryset(self):
        """
        Override get_queryset to filter images by product_id
        """
        product_id = self.kwargs['product_id']
        return ProductImage.objects.filter(product_id=product_id)
    
    def get_serializer_context(self):
        """
        Add request to serializer context for absolute URL generation
        """
        context = super().get_serializer_context()
        context['request'] = self.request
        return context
        
    def perform_create(self, serializer):
        """
        Set the product when creating a new image
        """
        product_id = self.kwargs['product_id']
        product = Product.objects.get(pk=product_id)
        serializer.save(product=product)

        
class CatalogueListCreateView(generics.ListCreateAPIView):
    queryset = Catalogue.objects.filter(is_active=True)
    serializer_class = CatalogueSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        queryset = super().get_queryset()
        sort_by = self.request.query_params.get('sort_by', None)
        
        if sort_by == 'discount':
            # Get all catalogues with products and annotate with discount amount
            queryset = queryset.filter(product__isnull=False).annotate(
                discount_amount=models.F('product__mrp') - models.F('product__selling_price')
            ).order_by('-discount_amount')
        elif sort_by == 'new':
            queryset = queryset.filter(product__isnull=False).order_by('-created_at')
            
        return queryset

class CatalogueDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Catalogue.objects.all()
    serializer_class = CatalogueSerializer
    permission_classes = [permissions.IsAdminUser]        