import { useFormik } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { v4 as uuid } from "uuid";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import FormikInput from "../../UI/input/FormikInput";
import QuestionContext from "../../../contexts/QuestionContext";
import UsersContext from "../../../contexts/UsersContext";

const StyledAddFormPage = styled.main`
  > form {
    max-width: 1440px;
    > div {
      display: grid;
    }
  }
`;

const AddQuestion = () => {
  const { setQuestion, QuestionActionTypes } = useContext(QuestionContext);
  const { loggedInUser } = useContext(UsersContext);
  const navigate = useNavigate();

  const values = {
    id: uuid(),
    userName: loggedInUser.userName,
    title: "",
    description: "",
    postDate: new Date()
  };

  const validationSchema = Yup.object({
    title: Yup.string()
      .min(5, "Minimum length 5 symbols")
      .max(50, "Maximum length 50 symbols")
      .required("This field must be filled"),
    description: Yup.string()
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
        ...values,
        postDate: new Date()
      };
      console.log(finalValues);
      setQuestion({
        type: QuestionActionTypes.add,
        data: finalValues,
      });
      navigate("/");
    },
  });

  return (
    <StyledAddFormPage>
      <h1>What do you want to ask?</h1>
      <form onSubmit={formik.handleSubmit}>
        <FormikInput type="text" name="title" formik={formik} />
        <FormikInput type="text" name="description" formik={formik} />
        <button type="Submit">Post Question</button>
      </form>
    </StyledAddFormPage>
  );
};

export default AddQuestion;
