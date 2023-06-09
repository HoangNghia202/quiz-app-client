import React from "react";
import correctImg from "../../assets/img/correct.png";
import wrongImg from "../../assets/img/wrong.png";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
    resetQuestionNow,
    setBankSelected,
    resetAnswerOfUser,
} from "../../redux/bankSlice";

const ReviewAnswer = () => {
    const userAnswers = useSelector((state) => state.bank.answerOfUser);
    const questions = useSelector((state) => state.bank.bankSelected.questions);
    const dispatch = useDispatch();
    console.log("userAnswers", userAnswers);
    console.log("questions", questions);
    const navigate = useNavigate();
    const checkIsCorrect = (solution, ans) => {
        if (solution === ans) {
            return true;
        }
        return false;
    };

    const handelClickDoAgain = () => {
        dispatch(resetAnswerOfUser());
        dispatch(resetQuestionNow());
        navigate(-1);
    };

    const handleClickOtherBank = () => {
        dispatch(setBankSelected({}));
        dispatch(resetAnswerOfUser());
        dispatch(resetQuestionNow());
        navigate("/home");
    };

    return (
        <>
            <div className="h-100vh flex flex-col  relative">
                <div className="grid grid-cols-4 gap-10 px-10">
                    <div className="col-span-3">
                        {questions?.map((question, index) => {
                            return (
                                <div className="my-8 relative ">
                                    <div className="absolute w-12 h-12 right-6 top-4">
                                        <img
                                            src={
                                                checkIsCorrect(
                                                    question.solution,
                                                    userAnswers[index]
                                                )
                                                    ? correctImg
                                                    : wrongImg
                                            }
                                            alt=""
                                        />
                                    </div>
                                    <div className=" border-2 border-yellow-50 rounded-md p-4">
                                        <div className="question border-b-1 pb-3 mb-3">
                                            <h6>
                                                {" "}
                                                <strong>
                                                    Question 1: {question.title}
                                                </strong>{" "}
                                            </h6>
                                            <p>{question.ans1}</p>
                                            <p>{question.ans2}</p>
                                            <p>{question.ans3}</p>
                                            <p>{question.ans4}</p>
                                        </div>

                                        <p>
                                            Your answer: {userAnswers[index]}{" "}
                                        </p>
                                        <p>
                                            Correct answer: {question.solution}{" "}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="col-span-1 relative ">
                        <div className="  text-center mb-6 sticky top-20 ">
                            <div className=" my-5">
                                {" "}
                                <Button
                                    variant="outlined"
                                    color="success"
                                    sx={{ marginX: "10px" }}
                                    onClick={() => handelClickDoAgain()}
                                >
                                    Do againnn
                                </Button>
                            </div>

                            <div>
                                <Button
                                    variant="outlined"
                                    color="warning"
                                    sx={{ marginX: "10px" }}
                                    onClick={() => handleClickOtherBank()}
                                >
                                    Other Bank
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ReviewAnswer;
