from kivy.app import App
from lib.iconfonts import register
from kivy.config import Config

from widgets.root import Root

register("material", "font/MaterialIcons-Regular.ttf", "font/material-icons-regular.fontd")
Config.set('graphics', 'width', 312)
Config.set('graphics', 'height', 670)


class TripplerApp(App):

    def build(self):
        return Root()


if __name__ == "__main__":
    TripplerApp().run()
