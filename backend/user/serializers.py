# pylint: disable=missing-docstring, abstract-method

from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken

from .models import CustomUser


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    group = serializers.CharField()

    class Meta:
        model = CustomUser
        fields = ["name", "email", "password", "group"]

    def create(self, validated_data):
        email = validated_data["email"]
        name = validated_data["name"]
        password = validated_data["password"]
        group_name = validated_data["group"]

        # Assign the user to the specified group
        try:
            group = Group.objects.get(name=group_name)
        except ObjectDoesNotExist:
            raise ValidationError(f"Group '{group_name}' does not exist.")

        user = CustomUser.objects.create_user(email=email, name=name, password=password)
        user.groups.add(group)

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
    profile_picture = serializers.SerializerMethodField()

    class Meta:
        model = get_user_model()
        fields = [
            "id",
            "name",
            "email",
            "role",
            "bio",
            "profile_picture",
        ]

    def get_profile_picture(self, obj):
        if obj.profile_picture:
            return obj.profile_picture.url
        return None


class UserProfileUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ["profile_picture", "bio"]


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        return super().validate(attrs)
