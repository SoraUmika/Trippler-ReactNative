"""
Run this file to generate a font dictionary file from a css file,
which is required for register an icon font.

`python font/fontdcreator <css-file> <out-file>`
"""
from lib.iconfonts import create_fontdict_file
from sys import argv

css, out = argv[1:3]

create_fontdict_file(css, out)
