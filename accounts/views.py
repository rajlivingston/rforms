from django.shortcuts import render
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response

class UserViewSet(ViewSet):
    def list(self, request):
        return Response({"message": "User list"})


# Create your views here.
