class Reducers:

    @staticmethod
    def current_screen(value, action):
        if action.type == "SET_CURRENT_SCREEN":
            return action.screen_name
        return value
