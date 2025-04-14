from django.http import JsonResponse
from django.views import View

class TestConnectionView(View):
    def get(self, request):
        return JsonResponse({"message": "Connection successful"})
