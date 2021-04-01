import React, { useState, inputEl, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import "../AdminInfo/AdminInfo.css";
import Axios from "axios";
import { Button, Grid, Typography, TextareaAutosize } from "@material-ui/core";

const EditFaqRodal = (props) => {
  const { setRender } = props.render;

  const [question, setQuestion] = useState(props.val.question);
  const [answer, setAnswer] = useState(props.val.answer);

  const [listFaq, setlistFaq] = useState([]);

  /** error States */

  const [questionErr, setQuestionErr] = useState("");
  const [answerErr, setAnswerErr] = useState("");

  const expireToken = () => {
    localStorage.clear() && <Redirect exact="true" to="/Admin-Login" />;
  };

  const [success, setSuccess] = useState("");

  const [close, setClose] = useState("");

  /** Update Faq */
  const updateInfo = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("question", question);
    data.append("answer", answer);
    try {
      await Axios.post(
        `http://localhost:8000/api/faq/${props.val.id}?_method=PUT `,
        data,
        {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: "Bearer " + localStorage.getItem("tokens"),
          },
        }
      ).then((response) => {
        if (
          response.data.status === "Token is Expired" ||
          response.data.status === "Token is Invalid" ||
          response.data.status === "Authorization Token not found"
        ) {
          expireToken();
          return window.location.reload();
        } else {
          console.log(response.data);
          setRender((prev) => !prev);
          setSuccess("Faq Updated Successfully!!!");
          setTimeout(() => {
            setClose(props.hide);
          }, 2300);
        }
      });
    } catch (error) {
      if (error.response) {
        setQuestionErr(error.response.data.errors.question);
        setAnswerErr(error.response.data.errors.answer);
      }
    }
  };

  return (
    <Rodal
      visible={props.visible}
      onClose={success ? close : props.hide}
      animation={props.animation}
      duration={props.duration}
      closeMaskOnClick={props.closeMaskOnClick}
      closeOnEsc={props.closeMaskOnClick}
      height={props.height}
      width={props.width}
    >
      <form className="addAdmin">
        <h1 className="Rodal_Title" style={{ textAlign: "center" }}>
          Add New Faq
        </h1>
        <Grid container spacing={3}>
          <Typography style={{ color: "green", margin: "0 auto" }}>
            {success}
          </Typography>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Typography style={{ color: "red", margin: "0 auto" }}>
                {questionErr}
              </Typography>
              <Typography
                style={{
                  marginRight: "28.5vw",
                  color: "#2196f3",
                  textTransform: "uppercase",
                  fontFamily: "Impact, Arial black, sans-serif",
                }}
              >
                Question
              </Typography>
              <Grid item xs={12}>
                <TextareaAutosize
                  rows={10}
                  cols={56}
                  inputRef={inputEl}
                  label="Question"
                  name="question"
                  size="small"
                  variant="outlined"
                  value={question}
                  onChange={(e) => {
                    setQuestion(e.target.value);
                    setQuestionErr("");
                  }}
                />
              </Grid>
              <Typography style={{ color: "red", margin: "0 auto" }}>
                {answerErr}
              </Typography>
              <Typography
                style={{
                  marginRight: "28.5vw",
                  color: "#2196f3",
                  textTransform: "uppercase",
                  fontFamily: "Impact, Arial black, sans-serif",
                }}
              >
                Answer
              </Typography>
              <Grid item xs={12}>
                <TextareaAutosize
                  rows={10}
                  cols={56}
                  inputRef={inputEl}
                  label="Answer"
                  name="answer"
                  size="small"
                  variant="outlined"
                  value={answer}
                  onChange={(e) => {
                    setAnswer(e.target.value);
                    setAnswerErr("");
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Button
              color="primary"
              fullWidth
              type="submit"
              variant="contained"
              onClick={updateInfo}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Rodal>
  );
};

export default EditFaqRodal;
