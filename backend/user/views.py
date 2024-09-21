from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.permissions import (
    AllowAny,
    IsAdminUser,
    IsAuthenticated,
    IsAuthenticatedOrReadOnly,
)
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import CustomUser
from .serializers import (
    CustomTokenObtainPairSerializer,
    RegisterSerializer,
    UserProfileSerializer,
    UserProfileUpdateSerializer,
)


class RegisterView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            result = serializer.save()
            user = result["user"]

            return Response(
                {
                    "user": {
                        "id": user.id,
                        "name": user.name,
                        "email": user.email,
                        "role": user.role,
                        "bio": user.bio if hasattr(user, "bio") else None,
                        "profile_picture": user.profile_picture.url
                        if hasattr(user, "profile_picture") and user.profile_picture
                        else None,
                        "contact_number": user.contact_number
                        if hasattr(user, "contact_number")
                        else None,
                        "address": user.address if hasattr(user, "address") else None,
                        "date_joined": user.date_joined,
                    },
                    "token": result["token"],
                },
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Custom TokenObtainPairView to handle login with email
class CustomTokenObtainPairView(TokenObtainPairView):
    permission_classes = [AllowAny]

    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        email = request.data.get("email", None)
        password = request.data.get("password", None)

        if not email or not password:
            return Response(
                {"detail": "Email and password are required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        return super().post(request, *args, **kwargs)


class UserProfileView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request):
        if request.user.is_authenticated:
            user = request.user
            serializer = UserProfileSerializer(user)
            return Response(serializer.data)
        return Response(
            {"detail": "Authentication credentials were not provided."},
            status=status.HTTP_401_UNAUTHORIZED,
        )

    def patch(self, request):
        if request.user.is_authenticated:
            user = request.user
            serializer = UserProfileUpdateSerializer(user, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(
            {"detail": "Authentication credentials were not provided."},
            status=status.HTTP_401_UNAUTHORIZED,
        )



class AdminUserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, profile_id=None):
        if profile_id:
            user_profile = get_object_or_404(CustomUser, id=profile_id)
            serializer = UserProfileSerializer(user_profile)
            return Response(serializer.data)
        user_profiles = CustomUser.objects.all()
        serializer = UserProfileSerializer(user_profiles, many=True)
        return Response(serializer.data)


class UserProfileDetail(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get(self, request, pk):
        user = get_object_or_404(CustomUser, pk=pk)
        serializer = UserProfileSerializer(user)
        return Response(serializer.data)

    def delete(self, request, pk):
        user = get_object_or_404(CustomUser, pk=pk)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
