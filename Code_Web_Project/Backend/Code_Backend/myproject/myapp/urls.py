from django.urls import path
from .views import TestConnectionView

urlpatterns = [
    path('test-connection/', TestConnectionView.as_view(), name='test_connection'),
]
