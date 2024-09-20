# pylint: disable=missing-docstring

from django.urls import path

from .views import RecipeDetailView, RecipeListView, ReviewCreateView, ReviewListView

urlpatterns = [
    path("", RecipeListView.as_view(), name="recipe-list"),
    path("<int:pk>/", RecipeDetailView.as_view(), name="recipe-detail"),
]
