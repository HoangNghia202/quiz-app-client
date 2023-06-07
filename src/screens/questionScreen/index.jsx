import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Notification from "../components/Notification";
import {
    resetQuestionNow,
    setBankSelected,
    setNextQuestion,
} from "../../redux/bankSlice";
import { useNavigate } from "react-router-dom";
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
    console.log("answerChoose", answerChoose);

    console.log("propsForDialog", propsForDialog);

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
            dispatch(setNextQuestion());
        }
    };

    const doEndQuestion = () => {
        dispatch(resetQuestionNow());
        dispatch(setBankSelected({}));
        navigate("/home");
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
                                    <stroonSelectng>
                                        {question.title}{" "}
                                    </stroonSelectng>{" "}
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
            />

            {/* dialog for end of question */}
            <Notification
                title={"Completed!"}
                type={"end"}
                content={"You have finished all question"}
                open={openDialogEnd}
                handleClose={() => setOpenDialogEnd(false)}
                next={doEndQuestion}
            />
        </>
    );
};

export default QuestionScreen;
