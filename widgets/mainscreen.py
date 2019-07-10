from kivy.lang.builder import Builder
from kivy.uix.screenmanager import Screen

Builder.load_string("""
<MainScreen>:
    FloatLayout:
        Widget:
            id: screen_widget
            canvas.before:
                Color:
                    rgba: 1, 1, 1, 1
                Rectangle:
                    size: root.size

            Image:
                source: 'image/firstIMG.jpg'
                allow_stretch: False
                keep_ratio: False
                size: 666, 500
                pos: -180, 150

            FloatLayout:
                size: root.width, root.height*0.08
                pos: 0, root.height-self.height
                canvas.before:
                    Color:
                        rgba: 0, 0, 0, 1
                    Rectangle:
                        size: self.size
                        pos: 0, root.height-self.height
                Button:
                    pos_hint: {'top': 1, 'right': 1}
                    #pos: self.parent.pos
                    size_hint: 0.2, 0.95
                    on_press: print(self.pos)
                    canvas:
                        Rectangle:
                            pos: self.pos
                            size: self.size
                            source: 'image/icon_account.png'
                Button:
                    pos_hint: {'top': 1, 'left': 1}
                    #pos: self.parent.pos
                    size_hint: 0.2, 0.95
                    on_press: print(self.pos)
                    canvas:
                        Rectangle:
                            pos: self.pos
                            size: self.size
                            source: 'image/icon_list.png'
                Label:
                    text: '[u][i][b]Trippler[/b][/i][/u]'
                    markup: True
                    font_size: 25
                    color: 0.5, 0.5, 0.5, 1
                    pos_hint: {'top': 1}



            Widget:
                size: root.width, root.height * 0.27
                FloatLayout:
                    id: 'info_widget'
                    size: root.width, root.height * 0.27
                    pos: root.pos
                    canvas.before:
                        Color:
                            rgba: 1, 1, 1, 1
                        Rectangle:
                            size: self.width, self.height
                            pos: self.pos
                    Button:
                        id: "Save_Button"　
                        text: "Save"
                        font_size: 15
                        size_hint: (.3, .15)
                        pos_hint: {'x': 0.5, 'y': 0.1}
                    Button:
                        id: "Add_Button"
                        text: "Add"
                        font_size: 15
                        size_hint: (.3, .15)
                        pos_hint: {'x': 0.17, 'y': 0.1}

                    Button:
                        id: "left_button"
                        size_hint: (.1, .2)
                        pos_hint: {'x': 0.85, 'y': 0.08}
                        text: ">"
                        font_size: 25

                    Button:
                        id: "right_button"
                        size_hint: (.1, .2)
                        pos_hint: {'x': 0.03, 'y': 0.08}
                        text: "<"
                        font_size: 25

                    Label:
                        id: my_label
                        markup: True
                        text: "[color=808080][u][b]Dumpling![/b][/u][/color]"
                        size_hint_y: None
                        height: self.texture_size[1]
                        text_size: root.width, None
                        font_size: 30
                        pos_hint: {'top': 0.97}
                        color: 0, 0, 0, 1

                    Label:
                        id: my_label
                        text: "Address Here"
                        size_hint_y: None
                        height: self.texture_size[1]
                        text_size: root.width, None
                        font_size: 15
                        pos_hint: {'top': 0.75}
                        color: 0, 0, 0, 1


                    Label:
                        id: my_label
                        text: "                                                Distance Here"
                        size_hint_y: None
                        height: self.texture_size[1]
                        text_size: root.width, None
                        font_size: 15
                        pos_hint: {'top': 0.75, 'right': 1}
                        color: 0, 0, 0, 1

                    Label:
                        id: my_label
                        text: "Ratings: ***** - 3.5"
                        size_hint_y: None
                        height: self.texture_size[1]
                        text_size: root.width, None
                        font_size: 14
                        pos_hint: {'top': 0.60}
                        color: 0, 0, 0, 1

                    Label:
                        id: my_label
                        text: "                                                    123 reviews"
                        size_hint_y: None
                        height: self.texture_size[1]
                        text_size: root.width, None
                        font_size: 15
                        pos_hint: {'top': 0.60, 'right': 1}
                        color: 0, 0, 0, 1


                    Label:
                        id: my_label
                        text: "Average cost: $124.54"
                        size_hint_y: None
                        height: self.texture_size[1]
                        text_size: root.width, None
                        font_size: 13
                        pos_hint: {'top': 0.45}
                        color: 0, 0, 0, 1

                    Label:
                        id: my_label
                        markup: True
                        text: "                                                               [color=00FF00]Open[/color]"
                        size_hint_y: None
                        height: self.texture_size[1]
                        text_size: root.width, None
                        font_size: 15
                        pos_hint: {'top': 0.45, 'right': 1}
                        color: 0, 0, 0, 1
""")


class MainScreen(Screen):
    pass
