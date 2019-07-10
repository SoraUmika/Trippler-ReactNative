from kivy.uix.screenmanager import ScreenManager
from kivy.lang.builder import Builder

from .mainscreen import MainScreen
from .loginscreen import LoginScreen
import store

Builder.load_string("""
<Root>:
    LoginScreen:
        name: 'login'
    MainScreen:
        name: 'main'
""")


class Root(ScreenManager):

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        store.subscribe(self.on_screen_change, "current_screen")

    def on_screen_change(self):
        self.current = store.get("current_screen")
