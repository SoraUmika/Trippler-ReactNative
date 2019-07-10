from kivy.app import App
from kivy.uix.label import Label

class MyWidget(Label):
    pass


class Trippler(App):
    def build(self):
        return MyWidget()


if __name__ == "__main__":
    Trippler().run()