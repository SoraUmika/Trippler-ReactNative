from kivy.app import App
from kivy.uix.widget import Widget
from kivy.uix.screenmanager import ScreenManager, Screen
from kivy.uix.boxlayout import BoxLayout
from kivy.properties import ListProperty, ObjectProperty
from kivy.graphics.vertex_instructions import Rectangle, Ellipse, Line
from kivy.uix.image import Image
from kivy.uix.button import Button
from kivy.config import Config
import random
from kivy.lang import Builder
from kivy.uix.behaviors.button import ButtonBehavior
Builder.load_string('''

''')
Config.set('graphics', 'width', 312)
Config.set('graphics', 'height', 670)


class LoginPage(Screen):
    pass


class MainWidget(Screen):

    pass


class IconButton(Button):
    def __init__(self, source):
        super(IconButton, self).__init__()
        self.add_widget(Image(source=source))


class ImageButton(ButtonBehavior, Image):
    def on_press(self):
        print('pressed')


class ScatterTextWidget(BoxLayout):
    text_colour = ListProperty([1, 0, 0, 1])

    def change_label_colour(self, *args):
        colour = [random.uniform(0, 1) for i in range(3)] + [1]
        self.text_colour = colour


class MainApp(App):
    def build(self):
        sm = ScreenManager()
        sm.add_widget(LoginPage(name='Login'))
        sm.add_widget(MainWidget(name='MainWidget'))
        return sm

if __name__ == "__main__":
    MainApp().run()