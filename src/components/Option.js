import React from "react"

export default function Option(props) {
    
    let classes = "quiz-option";
    if(!props.reveal) {
        classes = props.selected ? classes + " selected" : classes; 
    }else{
        if(!props.correct) {
            classes += " unrelated"
            classes += props.selected ? " wrong" : ""
        }
        if(props.correct) {
            classes += " correct"
        }
    }
    
    return (
        <div className={classes} onClick={props.selectAnswer}>
            <span>{props.value}</span>
        </div>
    )
}