"""
Run this file to generate a font dictionary file from a css file,
which is required for register an icon font.
"""
from lib.iconfonts import create_fontdict_file

css = "material-icons.min.css"
out = "material-icons-regular.fontd"

create_fontdict_file(css, out)
