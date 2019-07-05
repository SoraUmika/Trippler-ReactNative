"""
This file is for constant variables of Color objects.
When referencing to a color, to ensure the unity of the app,
use the constants of this module.
"""
from dataclasses import dataclass


@dataclass
class Color:
    kivy: tuple  # hex/rgb to float format converter: https://corecoding.com/utilities/rgb-or-hex-to-float.php
    hex: str


PRIMARY = Color((0.227, 0.682, 0.847, 1), "3AAED8")
