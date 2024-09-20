from django.urls import path, include

from rest_framework_simplejwt.views import TokenRefreshView
from user.views import (
    CustomTokenObtainPairView,
    DeleteProfileView,
    RegisterView,
    UserProfileUpdateView,
    UserProfileView,
    AdminUserProfileView
)
from recipe.views import ReviewCreateView, ReviewListView

urlpatterns = [
    path("auth/register/", RegisterView.as_view(), name="Register"),
    path("auth/login/", CustomTokenObtainPairView.as_view(), name="Login"),
    path("token/refresh/", TokenRefreshView.as_view(), name="Token Refresh"),
    path("profile/", UserProfileView.as_view(), name="Profile"),
    path("profile/update/", UserProfileUpdateView.as_view(), name="Update Profile"),
    path("profile/delete/", DeleteProfileView.as_view(), name="Delete Profile"),
    path('admin/profiles/', AdminUserProfileView.as_view(), name='admin-user-profiles'),
    path("recipes/", include("recipe.urls")),
    path("mealplans/", include("mealplan.urls")),
    path('reviews/', ReviewListView.as_view(), name='review-list'),
    path('reviews/<int:recipe_pk>/', ReviewListView.as_view(), name='review-list-by-recipe'),
    path(
        "<int:recipe_pk>/reviews/create/",
        ReviewCreateView.as_view(),
        name="review-create",
    )
]
