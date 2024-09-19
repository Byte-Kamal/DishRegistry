# pylint: disable=missing-docstring


from django.conf import settings
from django.db import models
from recipe.models import Recipe


class MealPlan(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    day = models.CharField(max_length=20)
    recipes = models.ManyToManyField(Recipe)

    def __str__(self):
        return f"Meal Plan for {self.day} by {self.user.name}"
