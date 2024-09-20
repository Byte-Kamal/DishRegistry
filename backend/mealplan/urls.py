# pylint: disable=missing-docstring

from django.urls import path

from .views import MealPlanDetailView, MealPlanListView

urlpatterns = [
    path("", MealPlanListView.as_view(), name="mealplan-list"),
    path("<int:pk>/", MealPlanDetailView.as_view(), name="mealplan-detail"),
]
