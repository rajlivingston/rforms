from rest_framework import serializers
from .models import UserForm, ShareForm


class FormFieldsSerializer(serializers.Serializer):
    type = serializers.CharField()
    label = serializers.CharField()
    key = serializers.CharField()
    required = serializers.BooleanField()

    def validate_type(self, value):
        if value not in ["short-text", "long-text", "email", "phone-number", "date", "number", "select", "checkbox", "radio"]:
            raise serializers.ValidationError("Invalid type")
        return value

class UserFormSerializer(serializers.ModelSerializer):
    form_data = FormFieldsSerializer(many=True)
    class Meta:
        model = UserForm
        fields = '__all__'

class ShareFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShareForm
        fields = '__all__'