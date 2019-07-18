import sys
from os.path import dirname, join


def to_abs_path(*paths):
    return join(dirname(__file__), *paths)


def get_component_name(svg_name):
    name = svg_name.split("-")[1]  # twotone-more_horiz-24px.svg -> more_horiz
    words = name.split("_")  # more_horiz -> [more, horiz]
    capped = [word.capitalize() for word in words]  # [more, horiz] -> [More, Horiz]
    return "".join(capped)  # [More, Horiz] -> MoreHoriz


def split_tags(svg_text_):
    return [
        split_tag(tag_)for tag_ in  # <a a=a -> <a, a=a
        svg_text_.split(">")[:-1]  # <.><./><./></.> -> <, <./, <./, </.
    ]


def svg_tag_to_jsx(svg_tags):
    new_jsx_tags = []
    for i, tag_ in enumerate(svg_tags):
        name, *props = tag_
        if name.startswith("</"):
            name = "</" + name[2:].capitalize()  # </tag -> </Tag
        else:
            name = "<" + name[1:].capitalize()  # <tag -> <Tag
        new_props = []
        if not i:  # if it is the start svg tag.
            for prop in props:
                prop_name, val = prop.split("=")
                if not prop_name == "xmlns":  # skip those props.
                    if prop_name == "viewBox":
                        val = '"' + val + '"'
                    else:
                        val = "{" + val + "}"  # 12 -> {12}
                    new_props.append("=".join((prop_name, val)))
            new_props.append("{...this.props}>")
        else:
            for prop in props:
                prop_name, val = prop.split("=")
                val = '"' + val + '"'  # 12 -> "12"
                new_props.append("=".join((prop_name, val)))
            if i < len(svg_tags) - 1:
                new_props.append("/>")
            else:
                new_props.append(">")
        props = new_props
        new_jsx_tags.append(" ".join([name] + props))
    return new_jsx_tags


def split_tag(svg_tag):
    splited = svg_tag.split(" ")
    name = splited[0]
    prop_str = " ".join(splited[1:])
    segs = prop_str.split('"')
    props = []
    for i, seg in enumerate(segs):
        if not i % 2 and seg.strip() and seg != "/":
            props.append(seg.strip() + segs[i + 1])
    return [name] + props


def format_jsx(jsx_tags_):
    formatted = ""
    for i, tag in enumerate(jsx_tags_):
        if not i:
            formatted += "    " * 3 + tag + "\n"
        elif i == len(jsx_tags_) - 1:
            formatted += "    " * 3 + tag
        else:
            formatted += "    " * 4 + tag + "\n"
    return formatted


# The name of the svg file to convert.
SVG_FILE_NAME = sys.argv[1]
if not SVG_FILE_NAME.endswith(".svg"):
    SVG_FILE_NAME += ".svg"
SVG_FILE_PATH = to_abs_path("src", "svg", SVG_FILE_NAME)

COMPONENT_NAME = get_component_name(SVG_FILE_NAME)
COMPONENT_FILE_PATH = to_abs_path("src", "svg", COMPONENT_NAME + ".tsx")

template = """import React, {Component} from "react";
import Svg, {Path, SvgProps} from "react-native-svg";

export default class %s extends Component<SvgProps> {
    
    shouldComponentUpdate() {
        return false;
    }
    
    render() {
        return (
%s
        )
    }

}

"""

with open(SVG_FILE_PATH, "r") as svg_file:
    svg_text = svg_file.read()
    jsx_tags = svg_tag_to_jsx(split_tags(svg_text))
    with open(COMPONENT_FILE_PATH, "w") as comp_file:
        comp_file.write(template % (COMPONENT_NAME, format_jsx(jsx_tags)))
