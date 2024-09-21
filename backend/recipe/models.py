from django.conf import settings
from django.db import models


class Recipe(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    category = models.CharField(max_length=255)
    cooking_time = models.PositiveIntegerField()  # in minutes
    servings = models.PositiveIntegerField()
    prep_time = models.PositiveIntegerField()  # in minutes
    tags = models.CharField(max_length=255, blank=True, null=True)
    image = models.URLField(blank=True, null=True)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="recipes"
    )
    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)

    def __str__(self):
        return self.title


class Ingredient(models.Model):
    recipe = models.ForeignKey(
        Recipe, on_delete=models.CASCADE, related_name="ingredients"
    )
    name = models.CharField(max_length=255)
    quantity = models.FloatField()
    unit = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.quantity} {self.unit} of {self.name}"


class Instruction(models.Model):
    recipe = models.ForeignKey(
        Recipe, on_delete=models.CASCADE, related_name="instructions"
    )
    step_number = models.IntegerField()
    instruction_text = models.TextField()

    def __str__(self):
        return f"Step {self.step_number}: {self.instruction_text}"


class Review(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="reviews"
    )
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name="reviews")
    title = models.CharField(max_length=255)
    rating = models.IntegerField()
    comment = models.TextField()
    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)

    def __str__(self):
        return f"Review by {self.user.name} on {self.recipe.title}"
