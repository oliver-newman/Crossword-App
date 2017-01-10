from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse, FileResponse, Http404
from .forms import PuzzleForm, UserForm
from django.utils import timezone
import json
from .models import Puzzle

def index(request):
    if not request.user.is_authenticated():
        can_edit = False;
    else:
        can_edit = True;
    puzzles = Puzzle.objects.all()
    form = UserForm(request.POST or None)
    context = {'puzzles': puzzles, 'form': form, 'user': can_edit}
    return render(request, 'crossword/index.html', context)

def detail(request, pk):
    puz = get_object_or_404(Puzzle, pk=pk)
    acrossClues = puz.aClues
    downClues = puz.dClues
    acrosses = []
    downs = []
    for i in range(len(acrossClues)):
        acrosses.append(str(acrossClues[i]))
    for j in range(len(downClues)):
        downs.append(str(downClues[j]))
    context = {
        'puz': puz,
        "acrosses": acrosses,
        "downs": downs
    }
    return render(request, 'crossword/detail.html', context)

def add_puzzle(request):
    if request.method == "POST":
        form = PuzzleForm(request.POST or None, request.FILES or None)
        if form.is_valid():
            puz = form.save(commit=False)
            puz.date_added = timezone.now()
            puz.data = request.FILES['data']
            puz.save()
            with open('media/'+str(puz.data)) as data_file:
                json_data = json.load(data_file)
            puz.spots = json_data["spots"]
            puz.ans = json_data["ans"]
            a_array = []
            d_array = []
            for i in range(len(json_data["aClues"])):
                a_array.append(json_data["aClues"][i])
            for j in range(len(json_data["dClues"])):
                d_array.append(json_data["dClues"][j])
            puz.aClues = a_array
            puz.dClues = d_array
            puz.save()
            return redirect('detail', pk=puz.pk)
    else:
        form = PuzzleForm()
    return render(request, 'crossword/add_puzzle.html', {'form': form})

def delete_puzzle(request, pk):
    puz = get_object_or_404(Puzzle, pk=pk)
    puz.delete()
    puzzles = Puzzle.objects.all()
    return render(request, 'crossword/index.html', {"puzzles": puzzles})

def login_user(request):
    if request.method == "POST":
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(username=username, password = password)
        if user is not None:
            if user.is_active:
                login(request, user)
                puzzles = Puzzle.objects.all()
                context = {'puzzles': puzzles}
                return redirect('index')
        puzzles = Puzzle.objects.all()
        form = UserForm(request.POST or None)
        context = {'puzzles': puzzles, 'form': form}
        return render(request, 'crossword/index.html', context)

def logout_user(request):
    logout(request)
    form = UserForm(request.POST or None)
    puzzles = Puzzle.objects.all()
    context = {'form': form, 'puzzles': puzzles}
    return redirect('index')

def show_pdf(request, pk):
    puz = get_object_or_404(Puzzle, pk=pk)
    try:
        return FileResponse(open('media/'+str(puz.pdf), 'rb'), content_type='application/pdf')
    except:
        raise Http404()
