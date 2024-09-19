# pylint: disable=missing-docstring

from django.urls import path

from .views import RecipeDetailView, RecipeListView, ReviewCreateView, ReviewListView

urlpatterns = [
    path("recipes/", RecipeListView.as_view(), name="recipe-list"),
    path("recipes/<int:pk>/", RecipeDetailView.as_view(), name="recipe-detail"),
    path(
        "recipes/<int:recipe_pk>/reviews/", ReviewListView.as_view(), name="review-list"
    ),
    path(
        "recipes/<int:recipe_pk>/reviews/create/",
        ReviewCreateView.as_view(),
        name="review-create",
    ),
]
