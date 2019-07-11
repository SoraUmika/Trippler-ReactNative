from kivy.app import App
from kivy.uix.screenmanager import ScreenManager, Screen
from kivy.config import Config
from kivy.lang.builder import Builder
Builder.load_file('kv_file/LoginScreen.kv')
Builder.load_file('kv_file/MainWidget.kv')


class LoginPage(Screen):
    pass


class MainWidget(Screen):

    pass


class MainApp(App):
    def build(self):
        sm = ScreenManager()
        sm.add_widget(LoginPage(name='Login'))
        sm.add_widget(MainWidget(name='MainWidget'))
        return sm


def load_configuration(application):
    with open('config.txt', 'r') as config_file:
        config_dict = {}
        key = []
        value = []
        for line in config_file:
            key.append(line.split(':')[0])
            striped_value = line.split(': ')[1]
            cleaned_value = striped_value.rstrip()
            value.append(cleaned_value)

        for k, v in zip(key, value):
            if v == 'False':
                v = 0
            config_dict[str(k)] = v
        application.title = config_dict['application_title']
        Config.set('kivy', 'window_icon', config_dict['logo_image'])
        Config.set('graphics', 'width', config_dict['application_default_width'])
        Config.set('graphics', 'height', config_dict['application_default_height'])
        Config.set('graphics', 'fullscreen', config_dict['full_screen'])
        Config.set('graphics', 'fullscreen', int(config_dict['max_fps']))


if __name__ == "__main__":
    load_configuration(MainApp)
    MainApp().run()