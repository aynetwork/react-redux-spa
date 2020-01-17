import React from "react";

import classes from './AnswersList.css'
import AnswersItem from "./AnswerItem/AnswersItem";

const AnswersList = (props) => {
    console.log(props.state);

    return (
        <ul className={classes.AnswersList}>
            {props.answers.map((answer, index)=>{
                return <AnswersItem
                    onAnswerClick={props.onAnswerClick}
                    key={index}
                    answer={answer}
                    state={props.state ? props.state[answer.id] : null}

                />
            })}
        </ul>
    )
}

export default AnswersList;