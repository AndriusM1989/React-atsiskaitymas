import { Formik } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormikInput from "../../UI/input/FormikInput";
import AnswerContext from "../../../contexts/AnswerContext";

const StyledEditFormPage = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  > form {
    display: grid;
    gap: 10px;

    > div {
      display: grid;
      grid-template-columns: 1fr 5fr;
    }
  }
`;

const EditAnswer = ({ data }) => {
  const { answer, setAnswer, AnswerActionTypes } = useContext(AnswerContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [formValues, setFormValues] = useState({
    answer: "",
  });

  useEffect(() => {
    fetch(`http://localhost:8080/answers/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.answer) {
          navigate("/");
        }
        setFormValues({
          ...data,
        });
        console.log(data);
      });
  }, []);

  const validationSchema = Yup.object({
    answer: Yup.string()
      .min(5, "Minimum length 5 symbols")
      .required("This field must be filled")
      .trim(),
  });

  return (
    <StyledEditFormPage>
      <h1>Edit Answer</h1>
      {formValues.answer && (
        <Formik
          initialValues={formValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log(values);
            const finalValues = {
              ...values,
              edited: values.answer !== answer.answer 
              ? new Date()
              : ''
            };
            console.log(finalValues);
            setAnswer({
              type: AnswerActionTypes.edit,
              id: id,
              data: finalValues,
            });
            navigate(`/`);
          }}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <FormikInput type="text" name="answer" formik={props} />
              <button type="Submit">Edit Answer</button>
            </form>
          )}
        </Formik>
      )}
    </StyledEditFormPage>
  );
};

export default EditAnswer;
