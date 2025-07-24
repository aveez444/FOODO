from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile, Address

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']

class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    default_address = serializers.PrimaryKeyRelatedField(queryset=Address.objects.all(), allow_null=True)

    class Meta:
        model = UserProfile
        fields = ['user', 'phone_number', 'default_address']

    def update(self, instance, validated_data):
        instance.phone_number = validated_data.get('phone_number', instance.phone_number)
        instance.default_address = validated_data.get('default_address', instance.default_address)
        instance.save()
        return instance

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ['id', 'street', 'city', 'state', 'country', 'postal_code', 'is_default']

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)