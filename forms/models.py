from django.db import models
from django.contrib.auth.models import User


class UserForm(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    title = models.CharField(max_length=255)
    description = models.TextField()
    is_active = models.BooleanField(default=True)
    form_data = models.JSONField()

    def __str__(self):
        return f"{self.user} - {self.title}"

class ShareForm(models.Model):
    form = models.ForeignKey(UserForm, on_delete=models.CASCADE)
    shared_user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.form} - {self.shared_user}"

# Create your models here.
