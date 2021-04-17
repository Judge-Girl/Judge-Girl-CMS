import {PathTitleLine} from "./PathTitleLine";
import * as React from "react";
import {ExamTabContainer} from "./ExamTabContainer";
import {useState} from "react";
import {ExamHome} from "../ExamHome";


const ExamAdminPage = ({history}) => {
  const currentPathName = history.location.pathname;
  let OPTION_TAB_ID = 3
  const [currentTab, setCurrentTab] = useState(OPTION_TAB_ID)
  return ( // TODO: class name of outer-most div?
    <>
      {/*<PathTitleLine title="Exam / 2021 C Exam"/>*/}
      <ExamHome currentPathName={currentPathName} examName={"2021 Sample-Exam"}/>
      <ExamTabContainer show={currentTab}
            onPageDidLoad={() => {}}/>
    </>
  )
}


export {ExamAdminPage}