from django import forms
from .models import Puzzle
from django.contrib.auth.models import User

class PuzzleForm(forms.ModelForm):

    class Meta:
        model = Puzzle
        fields = ('rows', 'columns', 'difficulty', 'author', 'data', 'pdf')

class UserForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput)

    class Meta:
        model = User
        fields = ['username', 'password']
