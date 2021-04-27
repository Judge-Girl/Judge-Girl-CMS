import React from "react";
import {withRouter} from "react-router";
import {ExamInPageNavigationBar} from "../ExamInPageNavigationBar";
import {TitleLine} from "../../commons/titles/TitleLine";
import ExamName from "./ExamName";
import ExamSchedule from "./ExamSchedule";
import ExamWhiteList from "./ExamWhiteList";
import {UpdateChangeButton} from "./UpdateChangeButton";
import './ExamOptions.css';
import './../../problem/ProblemEditor.css';

const ExamOptions = withRouter(({history}) => {
  const currentPathName = history.location.pathname;
  return (
    <>
      <ExamInPageNavigationBar currentPathName={currentPathName} examName={"2021 Sample-Exam"}/>
      <div style={{padding: "40px 100px 20px 100px"}}>
        <TitleLine title={"Options"}/>
        <div className="columns exam-options">
          <div className="column is-narrow" style={{width: "450px"}}>
            <section>
              <ExamName/>
            </section>
            <section>
              <ExamSchedule/>
            </section>
            <section>
              <ExamWhiteList/>
            </section>
            <section>
              <UpdateChangeButton
                onUpdateChangeButtonClick={() => alert("Change Updated!") }/>
            </section>
          </div>
          <div className="column right">
            Work in Progress.
          </div>
        </div>
        <TitleLine title={"Danger Zone"}/>
        <section>
          <div className="danger-zone">
            <div className="columns">
              <div className="column">
                <p className="title is-spaced is-5">Delete this exam</p>
                Once you delete an exam, there is no going back. Please be certain.
              </div>
              <div className="column is-narrow mt-1 mr-5">
                <button
                  className="button is-danger"
                  onClick={ () => alert("Exam Deleted!") }
                >Delete Exam</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
})


export {ExamOptions}