from kivy.lang.builder import Builder
from kivy.uix.button import Button
from kivy.uix.image import Image

Builder.load_string("""

""")


class IconButton(Button):
    def __init__(self, source):
        super(IconButton, self).__init__()
        self.add_widget(Image(source=source))
