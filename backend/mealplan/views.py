# pylint: disable=missing-docstring

from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import MealPlan
from .serializers import MealPlanSerializer


class MealPlanListView(APIView):
    def get(self, request):
        meal_plans = MealPlan.objects.filter(user=request.user)
        serializer = MealPlanSerializer(meal_plans, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = MealPlanSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MealPlanDetailView(APIView):
    def get(self, request, pk):
        meal_plan = get_object_or_404(MealPlan, pk=pk, user=request.user)
        serializer = MealPlanSerializer(meal_plan)
        return Response(serializer.data)

    def put(self, request, pk):
        meal_plan = get_object_or_404(MealPlan, pk=pk, user=request.user)
        serializer = MealPlanSerializer(meal_plan, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        meal_plan = get_object_or_404(MealPlan, pk=pk, user=request.user)
        meal_plan.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
