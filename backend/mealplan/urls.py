# pylint: disable=missing-docstring

from django.urls import path

from .views import MealPlanViewSet

urlpatterns = [
    path(
        "mealplans/",
        MealPlanViewSet.as_view({"get": "list", "post": "create"}),
        name="mealplan-list",
    ),
    path(
        "mealplans/<int:pk>/",
        MealPlanViewSet.as_view(
            {"get": "retrieve", "put": "update", "delete": "destroy"}
        ),
        name="mealplan-detail",
    ),
    path(
        "mealplans/generate-shopping-list/",
        MealPlanViewSet.as_view({"post": "generate_shopping_list"}),
        name="generate-shopping-list",
    ),
]
