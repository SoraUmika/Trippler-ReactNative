from kivy.lang.builder import Builder
from kivy.uix.screenmanager import Screen

import store

Builder.load_string("""
<LoginScreen>:
    canvas.before:
        Color:
            rgba: 30/255, 144/255, 1, 1
        Rectangle:
            size: root.size
    AnchorLayout:
        anchor_x: 'center'
        anchor_y: 'center'
        BoxLayout:
            orientation: 'vertical'
            size_hint: 0.5, 0.2
            TextInput:
                id: account_inputbox
                text: "user ID"
            TextInput:
                id: password_inputbox
                text: "password"
            Button:
                text: "Login"
                on_release: root.on_login_button_release()
""")


class LoginScreen(Screen):

    def on_login_button_release(self, *pargs):
        store.dispatch(store.SetCurrentScreen('main'))
