from rest_framework import serializers

from .models import Ingredient, Instruction, Recipe, Review


class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ["id", "name", "quantity", "unit"]


class InstructionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instruction
        fields = ["id", "step_number", "instruction_text"]


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = [
            "id",
            "user",
            "recipe",
            "title",
            "rating",
            "comment",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "user", "recipe", "created_at", "updated_at"]


class RecipeSerializer(serializers.ModelSerializer):
    ingredients = IngredientSerializer(many=True)
    instructions = InstructionSerializer(many=True)
    reviews = ReviewSerializer(many=True, read_only=True)
    created_by = serializers.ReadOnlyField(source="created_by.name")

    class Meta:
        model = Recipe
        fields = [
            "id",
            "title",
            "description",
            "category",
            "cooking_time",
            "servings",
            "prep_time",
            "tags",
            "image",
            "created_by",
            "created_at",
            "updated_at",
            "ingredients",
            "instructions",
            "reviews",
        ]
        read_only_fields = [
            "id",
            "created_by",
            "created_at",
            "updated_at",
        ]

    def create(self, validated_data):
        ingredients_data = validated_data.pop("ingredients")
        instructions_data = validated_data.pop("instructions")
        recipe = Recipe.objects.create(**validated_data)
        for ingredient_data in ingredients_data:
            Ingredient.objects.create(recipe=recipe, **ingredient_data)
        for instruction_data in instructions_data:
            Instruction.objects.create(recipe=recipe, **instruction_data)
        return recipe

    def update(self, instance, validated_data):
        ingredients_data = validated_data.pop("ingredients")
        instructions_data = validated_data.pop("instructions")

        instance.title = validated_data.get("title", instance.title)
        instance.description = validated_data.get("description", instance.description)
        instance.category = validated_data.get("category", instance.category)
        instance.cooking_time = validated_data.get(
            "cooking_time", instance.cooking_time
        )
        instance.servings = validated_data.get("servings", instance.servings)
        instance.prep_time = validated_data.get("prep_time", instance.prep_time)
        instance.tags = validated_data.get("tags", instance.tags)
        instance.image = validated_data.get("image", instance.image)
        instance.save()

        instance.ingredients.all().delete()
        for ingredient_data in ingredients_data:
            Ingredient.objects.create(recipe=instance, **ingredient_data)

        instance.instructions.all().delete()
        for instruction_data in instructions_data:
            Instruction.objects.create(recipe=instance, **instruction_data)

        return instance
