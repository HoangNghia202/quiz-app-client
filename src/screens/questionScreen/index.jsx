import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Notification from "../components/Notification";
import {
    pushAnswerOfUser,
    resetAnswerOfUser,
    resetQuestionNow,
    setBankSelected,
    setNextQuestion,
} from "../../redux/bankSlice";
import { useNavigate } from "react-router-dom";
import correctImg from "../../assets/img/correct.png";
import wrongImg from "../../assets/img/wrong.png";
import congraImg from "../../assets/img/congratulation.png";
import completeImg from "../../assets/img/complete.png";

const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
};

const Timer = ({ second }) => {
    return (
        <>
            <h6>Time</h6>
            <p>{formatTime(second)}</p>
        </>
    );
};

const QuestionScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const questions = useSelector((state) => state.bank.bankSelected.questions);
    console.log("questions", questions);
    const indexQuestion = useSelector((state) => state.bank.questionNow);
    const [question, setQuestion] = useState(questions[indexQuestion]);
    const [answerChoose, setAnswerChoose] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const [openDialogEnd, setOpenDialogEnd] = useState(false);
    const [propsForDialog, setPropsForDialog] = useState({});
    const [isCorrect, setIsCorrect] = useState(false);
    const [seconds, setSeconds] = useState(0);
    console.log("answerChoose", answerChoose);
    console.log("propsForDialog", propsForDialog);

    const [numCorrectAnswer, setNumCorrectAnswer] = useState(0);

    useEffect(() => {
        let interval;
        if (openDialogEnd === false) {
            interval = setInterval(() => {
                setSeconds((seconds) => seconds + 1);
            }, 1000);
        }
        return () => {
            clearInterval(interval);
        };
    }, [openDialogEnd]);

    useEffect(() => {
        if (isCorrect === true) {
            setNumCorrectAnswer(numCorrectAnswer + 1);
        }
    }, [isCorrect]);

    const closeDialog = () => {
        setOpenDialog(false);
    };

    const validateAnswer = () => {
        if (answerChoose === question.solution) {
            console.log("correct answer");
            setIsCorrect(true);
        } else {
            console.log("wrong answer");
            setIsCorrect(false);
        }
        dispatch(pushAnswerOfUser(answerChoose));
        setOpenDialog(true);
        console.log("openDialog", openDialog);
    };

    const openNextQuestion = () => {
        if (indexQuestion === questions.length - 1) {
            console.log("end of question");
            setOpenDialogEnd(true);
        } else {
            setQuestion(questions[indexQuestion + 1]);
            setAnswerChoose("");
            setIsCorrect(false);
            setOpenDialog(false);
            dispatch(setNextQuestion());
        }
    };

    const doEndQuestion = () => {
        dispatch(resetQuestionNow());
        dispatch(setBankSelected({}));
        dispatch(resetAnswerOfUser());
        navigate("/home");
    };

    const checkIfCorrectThanHaft = () => {
        if (numCorrectAnswer >= questions.length / 2) {
            return true;
        }
    };

    const reviewAnswer = () => {
        navigate("review");
    };
    return (
        <>
            <div className="flex h-100vh justify-center items-center">
                <div className="w-1/2 h-2/3 grid grid-cols-4">
                    <div className="col-span-1 h-100% bg-slate-600  rounded-xl rounded-tr-none rounded-br-none">
                        <div className="h-70% text-center">
                            <h5 className="mt-6">
                                Question {indexQuestion + 1}
                            </h5>
                            <Timer second={seconds} />
                        </div>
                        <div className="text-center">
                            <button onClick={() => validateAnswer()}>
                                <h5>Next</h5>
                            </button>
                        </div>
                    </div>
                    <div className="col-span-3 h-100% bg-slate-300  rounded-xl rounded-tl-none rounded-bl-none p-6">
                        <div className="h-100%">
                            <div className="question-title">
                                <p className="text-black">
                                    {" "}
                                    <strong>{question.title} </strong>{" "}
                                </p>
                            </div>
                            <div className="answers">
                                <div className="flex items-center my-4 border-2 px-3 rounded-md border-gray-500">
                                    <input
                                        type="radio"
                                        style={{
                                            width: "20px",
                                            height: "20px",
                                            color: "red",
                                        }}
                                        name="answer"
                                        value={"A"}
                                        checked={answerChoose === "A"}
                                        onClick={(e) => {
                                            setAnswerChoose(e.target.value);
                                        }}
                                    />
                                    <label
                                        htmlFor=""
                                        className="text-black p-3"
                                    >
                                        {question.ans1}
                                    </label>
                                </div>
                                <div className="flex items-center my-4 border-2 px-3 rounded-md border-gray-500">
                                    <input
                                        type="radio"
                                        style={{
                                            width: "20px",
                                            height: "20px",
                                            color: "black",
                                            backgroundColor: "red",
                                        }}
                                        name="answer"
                                        value={"B"}
                                        onClick={(e) => {
                                            setAnswerChoose(e.target.value);
                                        }}
                                        checked={answerChoose === "B"}
                                    />
                                    <label
                                        htmlFor=""
                                        className="text-black p-3"
                                    >
                                        {question.ans2}
                                    </label>
                                </div>
                                <div className="flex items-center my-4 border-2 px-3 rounded-md border-gray-500">
                                    <input
                                        type="radio"
                                        style={{
                                            width: "20px",
                                            height: "20px",
                                            color: "black",
                                            backgroundColor: "red",
                                        }}
                                        name="answer"
                                        value={"C"}
                                        onClick={(e) => {
                                            setAnswerChoose(e.target.value);
                                        }}
                                        checked={answerChoose === "C"}
                                    />
                                    <label
                                        htmlFor=""
                                        className="text-black p-3"
                                    >
                                        {question.ans3}
                                    </label>
                                </div>
                                <div className="flex items-center my-4 border-2 px-3 rounded-md border-gray-500">
                                    <input
                                        type="radio"
                                        style={{
                                            width: "20px",
                                            height: "20px",
                                            color: "black",
                                            backgroundColor: "red",
                                        }}
                                        name="answer"
                                        value={"D"}
                                        onClick={(e) => {
                                            setAnswerChoose(e.target.value);
                                        }}
                                        checked={answerChoose === "D"}
                                    />
                                    <label
                                        htmlFor=""
                                        className="text-black p-3"
                                    >
                                        {question.ans4}
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/*Dialog for validate answer                           */}
            <Notification
                title={isCorrect ? "Correct" : "Incorrect"}
                type={isCorrect ? "correct" : "incorrect"}
                content={isCorrect ? "" : `Solution is ${question.solution}`}
                open={openDialog}
                handleClose={closeDialog}
                next={openNextQuestion}
                imageUrl={isCorrect ? correctImg : wrongImg}
            />

            {/* dialog for end of question */}
            <Notification
                title={
                    checkIfCorrectThanHaft() ? "Congratulation!" : "Completed!"
                }
                type={"end"}
                content={
                    checkIfCorrectThanHaft()
                        ? `You amazing! ${numCorrectAnswer}/${questions.length} correct answer in ${seconds} seconds`
                        : `Better luck next time! ${numCorrectAnswer}/${questions.length} correct answer in ${seconds} seconds`
                }
                open={openDialogEnd}
                handleClose={() => setOpenDialogEnd(false)}
                next={doEndQuestion}
                otherAction={reviewAnswer}
                imageUrl={checkIfCorrectThanHaft() ? congraImg : completeImg}
            />
        </>
    );
};

export default QuestionScreen;
