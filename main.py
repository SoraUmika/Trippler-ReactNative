from kivy.app import App

from widgets import Root
from lib.iconfonts import register

register("font-awesome", "font/fa-regular-400.ttf", "font/font-awesome.fontd")


class TripplerApp(App):

    def build(self):
        return Root()


if __name__ == "__main__":
    TripplerApp().run()
