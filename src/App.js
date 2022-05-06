import React from "react"
import Start from "./components/Start"
import QuizList from "./components/QuizList"
import "./App.css"

export default function App() {
    const [quizStart, setQuizStart] = React.useState(false)
    
    function startQuiz() {
        setQuizStart(true)
    }
    return (
        <main>
            {!quizStart && <Start startQuiz={startQuiz}/>}
            {quizStart && <QuizList />}
        </main>
    )
}