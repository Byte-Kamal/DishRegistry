from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from user.views import (
    CustomTokenObtainPairView,
    DeleteProfileView,
    RegisterView,
    UserProfileUpdateView,
    UserProfileView,
)

urlpatterns = [
    path("auth/register/", RegisterView.as_view(), name="Register"),
    path("auth/login/", CustomTokenObtainPairView.as_view(), name="Login"),
    path("token/refresh/", TokenRefreshView.as_view(), name="Token Refresh"),
    path("profile/", UserProfileView.as_view(), name="Profile"),
    path("profile/update/", UserProfileUpdateView.as_view(), name="Update Profile"),
    path("profile/delete/", DeleteProfileView.as_view(), name="Delete Profile"),
]
