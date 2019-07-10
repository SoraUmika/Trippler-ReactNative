class Reducers:

    @staticmethod
    def current_screen(value, action):
        if action.type == "SET_CURRENT_PAGE":
            return action.screen_name
        return value
