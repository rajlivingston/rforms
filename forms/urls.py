from rest_framework.routers import DefaultRouter
from .viewsets import UserFormViewSet, ShareFormViewSet

router = DefaultRouter()
router.register(r'user-forms', UserFormViewSet, basename='user-form')
router.register(r'share-forms', ShareFormViewSet, basename='share-form')

urlpatterns = router.urls