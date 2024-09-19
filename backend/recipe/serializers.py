# pylint: disable=missing-docstring

from rest_framework import serializers

from .models import Recipe, Review


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ["id", "user", "rating", "review_text", "created_at"]


class RecipeSerializer(serializers.ModelSerializer):
    reviews = ReviewSerializer(many=True, read_only=True)

    class Meta:
        model = Recipe
        fields = [
            "id",
            "title",
            "ingredients",
            "instructions",
            "category",
            "tags",
            "created_by",
            "created_at",
            "updated_at",
            "reviews",
        ]
