import { Formik } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormikInput from "../../UI/input/FormikInput";
import QuestionContext from "../../../contexts/QuestionContext";

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

const EditQuestion = () => {
  const { setQuestion, QuestionActionTypes } = useContext(QuestionContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    fetch(`http://localhost:8080/questions/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.name) {
          navigate("/");
        }
        setFormValues({
          ...data,
        });
      });
  }, []);

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(5, "Minimum length 5 symbols")
      .max(50, "Maximum length 50 symbols")
      .required("This field must be filled")
      .trim(),
    description: Yup.string()
      .min(10, "Minimum length 10 symbols")
      .required("This field must be filled")
      .trim(),
  });

  return (
    <StyledEditFormPage>
      <h1>Edit Question</h1>
      {formValues.name && (
        <Formik
          initialValues={formValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            // console.log(values);
            const finalValues = {
              ...values,
            };
            // console.log(finalValues);
            setQuestion({
              type: QuestionActionTypes.edit,
              id: id,
              data: finalValues,
            });
            navigate(`/questionAnswer/${id}`);
          }}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <FormikInput type="text" name="name" formik={props} />
              <FormikInput type="text" name="description" formik={props} />
              <button type="Submit">Edit Question</button>
            </form>
          )}
        </Formik>
      )}
    </StyledEditFormPage>
  );
};

export default EditQuestion;
