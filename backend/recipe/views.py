# pylint: disable=missing-docstring

from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db.models import Q

from .models import Recipe, Review
from .serializers import RecipeSerializer, ReviewSerializer


class RecipeListView(APIView):
    def get(self, request):
        search_term = request.query_params.get('search', None)
        recipes = Recipe.objects.all()

        # If a search term is provided, filter the recipes
        if search_term:
            recipes = recipes.filter(
                Q(title__icontains=search_term) |
                Q(ingredients__icontains=search_term)
            )
        
        serializer = RecipeSerializer(recipes, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = RecipeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(created_by=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RecipeDetailView(APIView):
    def get(self, request, pk):
        recipe = get_object_or_404(Recipe, pk=pk)
        serializer = RecipeSerializer(recipe)
        return Response(serializer.data)

    def put(self, request, pk):
        recipe = get_object_or_404(Recipe, pk=pk, created_by=request.user)
        serializer = RecipeSerializer(recipe, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        recipe = get_object_or_404(Recipe, pk=pk, created_by=request.user)
        recipe.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class ReviewCreateView(APIView):
    def post(self, request, recipe_pk):
        recipe = get_object_or_404(Recipe, pk=recipe_pk)
        serializer = ReviewSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user, recipe=recipe)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ReviewListView(APIView):
    def get(self, request, recipe_pk=None):
        if recipe_pk:
            reviews = Review.objects.filter(recipe__id=recipe_pk)
        else:
            reviews = Review.objects.all()
        
        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data)

    
