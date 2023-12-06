import { useFormik } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { v4 as uuid } from "uuid";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormikInput from "../../UI/input/FormikInput";
import AnswerContext from "../../../contexts/AnswerContext";
import UsersContext from "../../../contexts/UsersContext";

const AddAnswer = () => {
  const { setAnswer, AnswerActionTypes } = useContext(AnswerContext);
  const { loggedInUser } = useContext(UsersContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const values = {
    id: uuid(),
    questionId: id,
    userName: loggedInUser.userName,
    answer: "",
    answerDate: new Date(),
    votes: 0,
  };

  const validationSchema = Yup.object({
    answer: Yup.string()
      .min(10, "Minimum length 10 symbols")
      .required("This field must be filled"),
  });

  const formik = useFormik({
    initialValues: values,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      const finalValues = {
        id: uuid(),
        userName: loggedInUser.userName,
        questionId: id,
        ...values,
        answerDate: new Date(),
        votes: 0,
      };
      console.log(finalValues);
      setAnswer({
        type: AnswerActionTypes.add,
        data: finalValues,
      });
      navigate("/");
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <FormikInput type="text" name="answer" formik={formik} />
        <button type="Submit">Post Answer</button>
      </form>
    </>
  );
};

export default AddAnswer;
