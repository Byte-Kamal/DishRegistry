from django.conf import settings
from django.db import models
from recipe.models import Recipe


class MealPlan(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="meal_plans"
    )
    day = models.CharField(max_length=10)
    recipes = models.ManyToManyField(Recipe, related_name="meal_plans")
    shopping_list = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.user.name}'s meal plan for {self.day}"
