from django.db.models import Q
from django.shortcuts import get_object_or_404
from rest_framework import permissions, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Recipe, Review
from .serializers import RecipeSerializer, ReviewSerializer


from rest_framework import permissions

class RecipeListCreateView(APIView):
    permission_classes = [permissions.AllowAny]  # Allow all users to access GET

    def get(self, request):
        search_query = request.query_params.get("search", "")
        recipes = Recipe.objects.all()

        if search_query:
            recipes = recipes.filter(
                Q(title__icontains=search_query)
                | Q(category__icontains=search_query)
                | Q(tags__icontains=search_query)
                | Q(ingredients__name__icontains=search_query)
            ).distinct()

        serializer = RecipeSerializer(recipes, many=True)
        return Response(serializer.data)

    def post(self, request):
        if request.user.is_authenticated:  # Check if the user is authenticated
            serializer = RecipeSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(created_by=request.user)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({"error": "Authentication required."}, status=status.HTTP_403_FORBIDDEN)



class RecipeDetailView(APIView):
    permission_classes = [permissions.AllowAny]  # Allow any user

    def get_object(self, pk):
        return get_object_or_404(Recipe, pk=pk)

    def get(self, request, pk):
        recipe = self.get_object(pk)
        serializer = RecipeSerializer(recipe)
        return Response(serializer.data)

    def put(self, request, pk):
        recipe = self.get_object(pk)
        serializer = RecipeSerializer(recipe, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        recipe = self.get_object(pk)
        recipe.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class ReviewListCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, recipe_pk):
        recipe = get_object_or_404(Recipe, pk=recipe_pk)
        serializer = ReviewSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user, recipe=recipe)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, recipe_pk):
        reviews = Review.objects.filter(recipe__pk=recipe_pk)
        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data)


class AllReviewsListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        reviews = Review.objects.all()
        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data)
