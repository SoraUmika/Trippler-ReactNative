from kivy.app import App
from lib.iconfonts import register

from widgets import Root

register("material", "font/MaterialIcons-Regular.ttf", "font/material-icons-regular.fontd")


class TripplerApp(App):

    def build(self):
        return Root()


if __name__ == "__main__":
    TripplerApp().run()
