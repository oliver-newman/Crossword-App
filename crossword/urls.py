from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index, name = 'index'),
    url(r'^(?P<pk>[0-9]+)/$', views.detail, name='detail'),
    url(r'^addpuzzle/$', views.add_puzzle, name='add_puzzle'),
    url(r'^deletepuzzle/(?P<pk>[0-9]+)/$', views.delete_puzzle, name='delete_puzzle'),
    url(r'^login_user/$', views.login_user, name='login_user'),
    url(r'^logout_user/$', views.logout_user, name='logout_user'),
    url(r'^show_pdf/(?P<pk>[0-9]+)/$', views.show_pdf, name='show_pdf'),
]
