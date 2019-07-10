from dataclasses import dataclass
from lib.flux import action


@dataclass
@action
class SetCurrentScreen:
    screen_name: str
