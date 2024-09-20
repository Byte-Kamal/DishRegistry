from rest_framework import serializers

from .models import MealPlan


class MealPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = MealPlan
        fields = ["id", "day", "recipes", "shopping_list"]
        read_only_fields = ["id", "shopping_list"]
