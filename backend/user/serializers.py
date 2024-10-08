# pylint: disable=missing-docstring, abstract-method

from django.contrib.auth.models import Group
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken

from .models import CustomUser


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    role = serializers.ChoiceField(choices=CustomUser.ROLE_CHOICES)

    class Meta:
        model = CustomUser
        fields = ["name", "email", "password", "role"]

    def create(self, validated_data):
        email = validated_data["email"]
        name = validated_data["name"]
        password = validated_data["password"]
        role = validated_data["role"]

        # Create the user
        user = CustomUser.objects.create_user(
            email=email, name=name, password=password, role=role
        )

        # Assign the user to the specified group
        try:
            group = Group.objects.get(name=role)
            user.groups.add(group)
        except ObjectDoesNotExist:
            user.delete()
            raise ValidationError(f"Group '{role}' does not exist.")

        refresh = RefreshToken.for_user(user)
        token_data = {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        }

        return {
            "user": user,
            "token": token_data,
        }


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            "id",
            "name",
            "email",
            "role",
            "bio",
            "profile_picture",
            "contact_number",
            "address",
            "date_joined",
        ]


class UserProfileUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ["bio", "profile_picture", "contact_number", "address"]


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        return super().validate(attrs)
