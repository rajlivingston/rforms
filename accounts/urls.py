
from rest_framework import routers

from .viewsets import RegisterUserViewSet, UserViewSet

router = routers.DefaultRouter()
router.register(r"register", RegisterUserViewSet, basename="register")
router.register(r"users", UserViewSet, basename="users")

urlpatterns = router.urls