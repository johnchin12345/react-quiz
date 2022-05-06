import React from "react"
import Option from "./Option"
import {decode} from "html-entities"
import {nanoid} from "nanoid"
import ReactLoading from "react-loading"

export default function Quiz() {
    
    const [quiz, setQuiz] = React.useState([])
    const [reveal, setReveal] = React.useState(false)
    const [totalCorrect, setTotalCorrect] = React.useState(0)
    const [reset, setReset] = React.useState(false);
    
    React.useEffect(() => {
        
        fetch("https://opentdb.com/api.php?amount=5")
            .then(async response => {
                const data = await response.json()
                
                let results = data.results.map((result) => {
                    
                    let formattedAnswers = result.incorrect_answers.map((ia) => {
                        return {
                            id: nanoid(),
                            value: decode(ia),
                            selected: false,
                            correct: false
                        }
                    })
                    formattedAnswers.push({
                        id: nanoid(),
                        value: decode(result.correct_answer),
                        selected: false,
                        correct: true
                    })
                    
                    return {
                        id: nanoid(),
                        question: decode(result.question),
                        answers: formattedAnswers.sort(() => Math.random() - 0.5),
                        correctAnswer: decode(result.correct_answer)
                    }
                })
                setQuiz(results);
            }).catch(error => {
                console.error(error)
            })
            console.log("call api")
        
    }, [reset])
    
    function selectAnswer(questionId, answerId) {
        setQuiz(oldQuiz => {
            return oldQuiz.map(oq => {
                if(oq.id === questionId) {
                    return {...oq, answers: oq.answers.map(oqa => (oqa.id === answerId ? {...oqa, selected: !oqa.selected} : {...oqa, selected: false}))}
                }else{
                    return oq;
                }
            })
        })
    }
    
    function revealAnswer() {
        const correctAnswers = quiz.filter(q => {
            return q.answers.filter(qa => qa.selected && qa.correct).length === 1
        })
        setTotalCorrect(correctAnswers.length)
        setReveal(true);
    }
    
    function resetGame() {
        setQuiz([])
        setReveal(false)
        setTotalCorrect(0)
        setReset(true);
    }
    
    const quizQuestions = quiz.map((q) => (
                    <div key={q.id} className="quiz-question">
                        <h2>{q.question}</h2>
                        <div className="quiz-option-box">
                            {
                                q.answers.map((ans) => (<Option selectAnswer={() => selectAnswer(q.id, ans.id)} key={ans.id} value={ans.value} selected={ans.selected} correct={ans.correct} reveal={reveal}/>))
                            }
                        </div>
                        <hr/>
                    </div>
                ));
    
    const quizBottom = reveal ? <div className="score-box">
                <p>You scored {`${totalCorrect}/${quiz.length}`} correct answers</p>
                <button className="quiz-button in-quiz" onClick={resetGame}>Play again</button>
            </div> : <button className="quiz-button in-quiz" onClick={revealAnswer}>Check answer</button>;
    
    return (
        <div className="quiz-box">
            {quiz.length > 0 && quizQuestions}
            {quiz.length > 0 && quizBottom}
            
            {quiz.length <= 0 && <div style={{display: "flex", justifyContent: "center"}}>
                <ReactLoading type="bubbles" color="#4D5B9E" width="3em"/>
            </div>}
        </div>
        
    )
}