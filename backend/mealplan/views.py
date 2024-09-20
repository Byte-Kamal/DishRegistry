from rest_framework import permissions, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import MealPlan
from .serializers import MealPlanSerializer


class MealPlanViewSet(viewsets.ModelViewSet):
    queryset = MealPlan.objects.all()
    serializer_class = MealPlanSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return MealPlan.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=False, methods=["post"], url_path="generate-shopping-list")
    def generate_shopping_list(self, request):
        day = request.data.get("meal_plan_day")
        meal_plan = MealPlan.objects.filter(user=request.user, day=day).first()

        if not meal_plan:
            return Response({"error": "Meal plan not found for the day"}, status=404)

        ingredients = []
        for recipe in meal_plan.recipes.all():
            for ingredient in recipe.ingredients.all():
                ingredient_str = (
                    f"{ingredient.quantity} {ingredient.unit} of {ingredient.name}"
                )
                ingredients.append(ingredient_str)

        # Remove duplicate ingredients
        unique_ingredients = list(set(ingredients))

        # Update the shopping_list field in MealPlan
        meal_plan.shopping_list = ", ".join(unique_ingredients)
        meal_plan.save()

        return Response(
            {
                "day": day,
                "ingredients": unique_ingredients,
            }
        )
