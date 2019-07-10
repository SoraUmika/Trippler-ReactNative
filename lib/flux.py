"""
What is this
============


This is a very simple implementation of Redux.
Redux website: https://redux.js.org/

From Redux README:
The whole state of your app is stored in an object tree inside a single store.
The only way to change the state tree is to emit an action, an object describing what happened.
To specify how the actions transform the state tree, you write pure reducers.


Create a store.
=============

To create a store, you need to pass in an initial value for the states,
which is a dictionary of kivy properties.
And a reducers collection class, that contains the reducers for the states.
`get, dispatch, subscribe = create_store(init_state, Reducers)`


Reducers collection class
=========================

This a pure static class, that contains each states' reducer.
For a state named 'test_state', a static method with the same name must included in the class.
It is the same for every state.

Example of a reducer of a state name 'test_state'.
`
@staticmethod
def test_state(value, action):
    if action == "TEST_ACTION":
        return value + 1
    return value
`

Example of a reducers collection class for a store with states of {'foo': ..., 'bar': ...}:
`
class Reducers:

    @staticmethod
    def foo(val, act):
        return val

    @staticmethod
    def bar(val, act):
        if act == "A_SIMPLE_ACTION":
            return 123
        return val
`


Get state
=========

Get state using the first function returned by create_store.
`num = get('widget_num')  # get the value of a state named 'widget_num'`


Dispatch action
===============

Dispatch action using the second function returned by create_store.
An action is any object that has the attribute of 'type'.
(see `action` function, a class wrapper that helps to generate an action class easily)

`dispatch(action_object)`


Subscribe a listener
====================

Subscribe a listener using the third function returned by create_store.
`subscribe(lambda: print(':D'))`

The listener will be called each time when the listening state(s) is changed.

The listener default to listening to all the state if only one argument is provided,
which is the listener function itself.

To listening to specific state, list the state names after the first argument.
`subscribe(lambda: print('The state num is changed.'), 'num')`

If it is listening to multiple states, the listener will be called for each change of the states.
So if all 3 listening states are changed, the listener will be called 3 time.


Usage Example
=============
`
initial_state = {
    'words': ListProperty(['foo', 'bar', 'egg']),
    'separator': StringProperty('-')
}


class Reducers:

    @staticmethod
    def words(value, action):
        if action.type == 'PUSH_WORD':
            return value + [action.new_word]
        elif action.type == 'POP_WORD':
            return value[:-1]
        return value

    @staticmethod
    def separator(value, action):
        if action.type == 'SET_SEPARATOR':
            return action.new_value
        return value


get, dispatch, subscribe = create_store(initial_state, Reducers)

subscribe(lambda: get('separator').join(get('words')))

dispatch({'type': 'POP_WORD'})
# foo-bar

dispatch({'type': 'PUSH_WORD', 'new_word': 'cat'})
# foo-bar-cat

dispatch({'type': 'SET_SEPARATOR', 'new_value': '*'})
# foo*bar*cat
`

"""
from kivy.event import EventDispatcher
from dataclasses import dataclass


def action(cls):
    """
    Class wrapper that creates an action class.
    The type of action is derived from the class name,
    for example, a class named `ChangePageNum` will have type of 'CHANGED_PAGE_NUM'.
    The payload of action derived from the class's static fields,
    The names and types of the static fields are the names and types of the payload parameters,
    for example, a static field of `num: int` is a parameter of the payload named 'num', typed `int`.
    Example of using this wrapper:
    `
    @action
    class ChangePageNum:
        num: int
        update: bool
    `
    This __init__ of the class will become __init__(num: int, update: bool).
    And an instance of the class will be an action object, with the attributes of
    {type: 'CHANGED_PAGE_NUM', num: 10, update: False}
    :param cls: The class to be wrapped.
    :return: A class with modified __str__, and new method __post_init__ for dataclass wrapper.
    """
    name = "".join([
        letter.upper() if letter.islower() else (
            ("_" if index else "") + letter
        )
        for index, letter in enumerate(
            str(cls).split(".")[-1].split("'")[0]
        )
    ])

    def __post_init__(self):
        self.type = name

    def __str__(self):
        s = super(cls, self).__str__()
        return name + ": " + s[s.index("("):]

    cls.__post_init__ = __post_init__
    cls.__str__ = __str__
    return dataclass(cls)


def create_store(init_state: dict, reducer_collection):
    """
    Create a store and return its methods.

    :param init_state: The initial state values of the store.
    :param reducer_collection: A reducers collection class, see module doc.
    :return: The methods of the store, (getter, dispatch, subscribe)
    """

    class States(EventDispatcher):
        """
        User an EventDispatcher to contain the state properties,
        so that state listeners can be called when bind property is changed.

        The listeners are not called once the callback of a property is triggered,
        but instead stored in `triggered_listeners`, and called at once using the
        method `call_listeners`
        """
        triggered_listeners = []

        @staticmethod
        def call_listeners():
            for listener in States.triggered_listeners:
                listener()

    listeners = {}
    event_callbacks = {}

    def callback_factory(property_name):

        def callback(*pargs):
            States.triggered_listeners += listeners[property_name]

        return callback

    for state_name, property_obj in init_state.items():
        setattr(States, state_name, property_obj)
        listeners[state_name] = []
        event_callbacks[state_name] = callback_factory(state_name)

    state = States()
    state.bind(**event_callbacks)

    # Isolate and collect each reducers in the reducer collection class
    # in to map between state name and its reducer.
    try:
        reducers = {
            key: reducer_collection.__dict__[key].__get__(object)
            for key in init_state
        }
    except KeyError:
        raise TypeError("The reducer collection class provided is not complete."
                        "Make sure for each state name, there is a static method with same name.")
    except AttributeError:
        raise TypeError("The reducer collection class provided is not pure static."
                        "Make sure there are only static methods in provided class.")

    def getter(name: str):
        """
        Get the value of the state with given name.

        :param name: The name of the state whose value will be returned.
        :return: The value of the state with given name.
        """
        try:
            return getattr(state, name)
        except KeyError:
            raise KeyError(f"The state {name} does not exist in store.")

    def dispatcher(act: object):
        """
        Dispatch an action, which is a object with attribute of 'type'
        :param act: A object with attribute of 'type'
        """
        if not hasattr(act, "type"):
            raise TypeError(f"{act} does not have attribute 'type'.")
        print(act)
        nonlocal state
        for key, reducer in reducers.items():
            setattr(state, key, reducer(getattr(state, key), act))
        States.call_listeners()

    def subscribe(func, *listening_states):
        """
        Added a listener that is called after an action is dispatched.
        :param func: A listener that is called after an action is dispatched.
        :param listening_states: The states that listener is listen to. If empty, listen to all states.
        :return: A function that unsubscribe the listener when called.
        """
        if not hasattr(func, "__call__"):
            raise TypeError(f"The callback function {func} is not callable.")
        if listening_states:
            for name in listening_states:  # subscribe to given states.
                listeners[name].append(func)
        else:
            for listener_list in listeners.values():  # subscribe to all states.
                listener_list.append(func)

        def un_subscribe():
            """
            Un-subscribe the listener.
            """
            if listening_states:
                if func in listeners[listening_states[0]]:
                    for name_ in listening_states:
                        listeners[name_].append(func)
            elif func in list(listeners.values())[0]:
                for listener_list_ in listeners.values():
                    listener_list_.remove(func)

        return un_subscribe

    return getter, dispatcher, subscribe
