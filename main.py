from kivy.app import App
from widgets import Root


class TripplerApp(App):

    def build(self):
        return Root()


if __name__ == "__main__":
    TripplerApp().run()
