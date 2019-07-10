from lib.flux import create_store
from .reducers import Reducers
from kivy.properties import StringProperty

init_state = {
    "current_screen": StringProperty("login")
}

get, dispatch, subscribe = create_store(init_state, Reducers)
