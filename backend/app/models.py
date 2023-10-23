import json
from django.db import models

# Create your models here.
class User(models.Model):
    id = models.BigAutoField(db_column='id', primary_key=True)
    username = models.CharField(max_length=50, db_column='username')
    password = models.CharField(max_length=128, db_column='password')
    name = models.CharField(max_length=50, db_column='name')
    created_time = models.DateTimeField(db_column='created_time')
    updated_time = models.DateTimeField(db_column='updated_time')

    def __str__(self) -> str:
        return json.dumps(self.__dict__, default=str)