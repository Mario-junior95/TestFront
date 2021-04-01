import React, { useState, inputEl, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import "../AdminInfo/AdminInfo.css";
import Axios from "axios";
import { Button, Grid, Typography, TextareaAutosize } from "@material-ui/core";

const AddFaqRodal = (props) => {
  const { setRender } = props.render;

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const [listFaq, setlistFaq] = useState([]);

  /** error States */

  const [questionErr, setQuestionErr] = useState("");
  const [answerErr, setAnswerErr] = useState("");

  /**  Clear Data */

  const clearData = () => {
    setAnswer("");
    setAnswerErr("");
    setQuestion("");
    setQuestionErr("");
  };

  const expireToken = () => {
    localStorage.clear() && <Redirect exact="true" to="/Admin-Login" />;
  };

  const [success, setSuccess] = useState("");

  const [close, setClose] = useState("");

  /**   Create Faq */

  const handleAdd = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("question", question);
    data.append("answer", answer);

    try {
      await Axios.post("http://localhost:8000/api/faq", data, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("tokens"),
        },
      }).then((response) => {
        if (
          response.data.status === "Token is Expired" ||
          response.data.status === "Token is Invalid" ||
          response.data.status === "Authorization Token not found"
        ) {
          expireToken();
          return window.location.reload();
        } else {
          setlistFaq(response.data.faq);
          setRender((prev) => !prev);
          setSuccess("Faq Added Successfully!!!");
          clearData();
          setTimeout(() => {
            setClose(props.hide);
          }, 2300);
        }
      });
    } catch (error) {
      if (error.response) {
        console.log(error);
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
                  color: "#2196f3",
                  marginRight: "28.5vw",
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
              onClick={handleAdd}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Rodal>
  );
};

export default AddFaqRodal;
