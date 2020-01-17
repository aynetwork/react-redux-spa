import React from "react";
import classes from './ActiveQuiz.css'
import AnswersList from "./AnswersList/AnswersList";


export default (props) => {
    console.log(props.state);
    return(
        <div className={classes.ActiveQuiz}>
            <p className={classes.Question}>
                <span>
                    <strong>{props.answerNumber}.</strong>&nbsp;
                    {props.quiz.question}
                </span>

                <small>{props.answerNumber} из {props.quizLength}</small>

            </p>
            <AnswersList
                onAnswerClick={props.onAnswerClick}
                answers={props.quiz.answers}
                state={props.state}

            />
        </div>
    )
}
