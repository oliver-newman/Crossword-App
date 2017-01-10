from __future__ import unicode_literals
from django.db import models
from django.contrib.postgres.fields import ArrayField, JSONField

# Create your models here.
class Puzzle(models.Model):
    rows = models.IntegerField()
    columns = models.IntegerField()
    date_added = models.DateField()
    difficulty = models.CharField(max_length=50)
    author = models.CharField(max_length=100)
    # file will be uploaded to media/crosswords
    data = models.FileField(upload_to='crossword/')
    ans = models.CharField(max_length=1000, default="")
    spots = models.CharField(max_length=1000, default="")
    aClues = ArrayField(models.CharField(max_length=1000), default=[])
    dClues = ArrayField(models.CharField(max_length=1000), default=[])
    pdf = models.FileField(upload_to='pdf/')
