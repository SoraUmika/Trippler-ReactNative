from lib.flux import action


@action
class SetCurrentScreen:
    screen_name: str
