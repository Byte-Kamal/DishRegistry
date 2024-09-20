# pylint: disable=missing-docstring
from django.urls import path

from .views import (
    AllReviewsListView,
    RecipeDetailView,
    RecipeListCreateView,
    ReviewListCreateView,
)

urlpatterns = [
    path("recipes/", RecipeListCreateView.as_view(), name="recipe-list-create"),
    path("recipes/<int:pk>/", RecipeDetailView.as_view(), name="recipe-detail"),
    path(
        "recipes/<int:recipe_pk>/reviews/",
        ReviewListCreateView.as_view(),
        name="review-list-create",
    ),
    path("reviews/", AllReviewsListView.as_view(), name="all-reviews-list"),
]
