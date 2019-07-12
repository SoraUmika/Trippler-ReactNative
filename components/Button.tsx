import { Component } from "react";

interface Props{
    type: "normal",
    text: string
}

export default class Button extends Component<Props>{
    render(){
        return (
            <button/>
        )
    }
}
