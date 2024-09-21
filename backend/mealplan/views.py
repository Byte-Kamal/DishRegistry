from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import MealPlan
from .serializers import MealPlanSerializer


class MealPlanAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        meal_plans = MealPlan.objects.filter(user=request.user)
        serializer = MealPlanSerializer(meal_plans, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = MealPlanSerializer(data=request.data)
        if serializer.is_valid():
            meal_plan = serializer.save(user=request.user)
            return Response(
                MealPlanSerializer(meal_plan).data, status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        try:
            meal_plan = MealPlan.objects.get(pk=pk, user=request.user)
        except MealPlan.DoesNotExist:
            return Response(
                {"error": "Meal plan not found"}, status=status.HTTP_404_NOT_FOUND
            )

        serializer = MealPlanSerializer(meal_plan, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            meal_plan = MealPlan.objects.get(pk=pk, user=request.user)
        except MealPlan.DoesNotExist:
            return Response(
                {"error": "Meal plan not found"}, status=status.HTTP_404_NOT_FOUND
            )

        meal_plan.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class GenerateShoppingListAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        day = request.data.get("meal_plan_day")
        meal_plan = MealPlan.objects.filter(user=request.user, day=day).first()

        if not meal_plan:
            return Response(
                {"error": "Meal plan not found for the day"},
                status=status.HTTP_404_NOT_FOUND,
            )

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
