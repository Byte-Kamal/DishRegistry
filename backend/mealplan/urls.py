# pylint: disable=missing-docstring

from django.urls import path

from .views import MealPlanAPIView, GenerateShoppingListAPIView

urlpatterns = [
       path('mealplans/', MealPlanAPIView.as_view(), name='mealplan-list-create'),
    path('mealplans/<int:pk>/', MealPlanAPIView.as_view(), name='mealplan-detail'),
    path('mealplans/generate-shopping-list/', GenerateShoppingListAPIView.as_view(), name='generate-shopping-list'),
]
