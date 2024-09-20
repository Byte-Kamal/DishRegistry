# pylint: disable=missing-docstring

from django.urls import path

from .views import (
    AdminUserProfileView,
    CustomTokenObtainPairView,
    DeleteProfileView,
    RegisterView,
    UserProfileView,
)

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", CustomTokenObtainPairView.as_view(), name="login"),
    path("profile/", UserProfileView.as_view(), name="profile"),
    path("profile/delete/", DeleteProfileView.as_view(), name="profile-delete"),
    path("admin/profiles/", AdminUserProfileView.as_view(), name="admin-profiles"),
]
