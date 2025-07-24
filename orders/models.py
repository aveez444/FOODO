from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator
from products.models import Product
from users.models import Address

class Order(models.Model):
    STATUS_CHOICES = (
        ('PENDING', 'Pending'),
        ('SHIPPED', 'Shipped'),
        ('DELIVERED', 'Delivered'),
        ('CANCELLED', 'Cancelled'),
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders')
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0)])
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    delivery_address = models.ForeignKey(Address, on_delete=models.SET_NULL, null=True, related_name='orders')
    payment_status = models.CharField(max_length=20, default='PENDING')

    def __str__(self):
        return f"Order {self.id} by {self.user.username}"

    class Meta:
        verbose_name = "Order"
        verbose_name_plural = "Orders"

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='order_items')
    quantity = models.PositiveIntegerField(validators=[MinValueValidator(1)])
    unit_price = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0)])

    def __str__(self):
        return f"{self.quantity} x {self.product.name} in order {self.order.id}"

    class Meta:
        verbose_name = "Order Item"
        verbose_name_plural = "Order Items"