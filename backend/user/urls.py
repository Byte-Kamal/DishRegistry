from django.urls import path
from .views import (
    AdminUserProfileView,
    CustomTokenObtainPairView,
    RegisterView,
    UserProfileDetail,
    UserProfileView,
)

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", CustomTokenObtainPairView.as_view(), name="login"),
    path("profile/", UserProfileView.as_view(), name="profile"),
    path('admin/profiles/', AdminUserProfileView.as_view(), name='admin-profiles'),
    path('admin/profiles/<int:profile_id>/', AdminUserProfileView.as_view(), name='admin-profile-detail'),
    path('profiles/<int:pk>/', UserProfileDetail.as_view(), name='user-detail'),
]
