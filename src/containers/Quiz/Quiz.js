import React, {Component} from 'react'
import classes from './Quiz.css'
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinizhedQuiz/FinishedQuiz";
import axios from "../../axios/azios-quiz"
import Loader from "../../components/UI/Loader/Loader";


import {connect} from "react-redux";
import {fetchQuizById, quizAnswerClick, retryHandler} from "../../store/actions/quiz";

class Quiz extends Component {


    async componentDidMount() {
        console.log(this.props)
        this.props.fetchQuizById(this.props.match.params.id)
    }
    componentWillUnmount() {
        this.props.retryHandler()
    }

    render() {
        console.log(this.props)
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Quiz</h1>

                    {this.props.loading || !this.props.quiz ? <Loader/> :

                        this.props.isFinished ?
                                <FinishedQuiz
                                    onRetry={this.props.retryHandler}
                                    results={this.props.results}
                                    quiz={this.props.quiz}
                                /> :
                                <ActiveQuiz
                                    quiz={this.props.quiz[this.props.activeQuestion]}
                                    onAnswerClick={this.props.onAnswerClickhandler}
                                    quizLength={this.props.quiz.length}
                                    answerNumber={this.props.activeQuestion + 1}
                                    state={this.props.answerState}
                                />


                    }


                </div>

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        activeQuestion : state.quiz.activeQuestion,
        answerState : state.quiz.answerState,
        loading : state.quiz.loading,
        results : state.quiz.results, // {[]}
        isFinished : state.quiz.isFinished,
        quiz : state.quiz.quiz
    }

}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizById : val=>dispatch(fetchQuizById(val)),
        onAnswerClickhandler : val=>dispatch(quizAnswerClick(val)),
        retryHandler : ()=>dispatch(retryHandler()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);