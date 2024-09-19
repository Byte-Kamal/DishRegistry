# pylint: disable=missing-docstring


from mealplan.models import MealPlan
from mealplan.serializers import MealPlanSerializer
from rest_framework import permissions, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response


class MealPlanViewSet(viewsets.ModelViewSet):
    queryset = MealPlan.objects.all()
    serializer_class = MealPlanSerializer
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=False, methods=["post"], url_path="generate-shopping-list")
    def generate_shopping_list(self, request):
        day = request.data.get("meal_plan_day")
        meal_plan = MealPlan.objects.filter(user=request.user, day=day).first()

        if not meal_plan:
            return Response({"error": "Meal plan not found for the day"}, status=404)

        ingredients = []
        for recipe in meal_plan.recipes.all():
            ingredients += recipe.ingredients.split(",")

        return Response(
            {
                "day": day,
                "ingredients": list(set(ingredients)),  # remove duplicate ingredients
            }
        )
