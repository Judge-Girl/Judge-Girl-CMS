import {ExamOptions} from "../ExamOptions";
import {ProblemsTab} from "./ProblemsTab";
import {ParticipantsTab} from "./ParticipantsTab";


const ExamTabContainer = () => {
  return (
    <>
      <ProblemsTab/>
      <ParticipantsTab/>
      <ExamOptions/>
    </>
  )
}






export {ExamTabContainer}