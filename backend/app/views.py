import json
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from app import models 

# Create your views here.
def login(request):
    request.encoding='utf-8'
    if request.method != 'POST': 
        data = {
            'code': 405,
        }
        return JsonResponse(data)
    req_body = json.loads(request.body)
    username = req_body['username']
    passwd = req_body['password']
    u = models.User.objects.all().filter(username=username).first()
    print("u:", u)
    if u is None or u.password != passwd:
        data = {
            'code': 400,
            'message': '账号密码错误',
        }
    else:
        data = {
            'code': 200,
            'message': 'ok',
            'data': {
                'name': u.name
            }
        }
    return JsonResponse(data)