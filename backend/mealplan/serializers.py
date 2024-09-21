from recipe.models import Recipe
from rest_framework import serializers

from .models import MealPlan


# Recipe Summary Serializer
class RecipeSummarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = ["id", "title"]


# MealPlan Serializer
class MealPlanSerializer(serializers.ModelSerializer):
    recipe_ids = serializers.PrimaryKeyRelatedField(
        queryset=Recipe.objects.all(), many=True, write_only=True, source="recipes"
    )
    recipes = RecipeSummarySerializer(many=True, read_only=True)

    class Meta:
        model = MealPlan
        fields = ["id", "day", "recipes", "recipe_ids", "shopping_list"]
        read_only_fields = ["id", "shopping_list"]

    def create(self, validated_data):
        recipes = validated_data.pop("recipes", [])
        meal_plan = MealPlan.objects.create(**validated_data)
        meal_plan.recipes.set(recipes)
        return meal_plan
