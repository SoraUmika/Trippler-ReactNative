from kivy.uix.screenmanager import ScreenManager
from kivy.lang.builder import Builder

from .mainscreen import MainScreen
from .loginscreen import LoginScreen

Builder.load_string("""
<Root>:
    LoginScreen:
        name: 'login'
    MainScreen:
        name: 'main'
""")


class Root(ScreenManager):
    pass
