# pylint: disable=missing-docstring

from django.urls import path

from .views import MealPlanDetailView, MealPlanListView

urlpatterns = [
    path("mealplans/", MealPlanListView.as_view(), name="mealplan-list"),
    path("mealplans/<int:pk>/", MealPlanDetailView.as_view(), name="mealplan-detail"),
]
