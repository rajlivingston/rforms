
from rest_framework import routers
from django.urls import path

from .viewsets import RegisterUserViewSet, UserViewSet, LoginViewSet

router = routers.DefaultRouter()
router.register(r"register", RegisterUserViewSet, basename="register")
router.register(r"users", UserViewSet, basename="users")

urlpatterns = [
    path('login/', LoginViewSet.as_view({'post': 'create'}), name='login'),
] + router.urls
