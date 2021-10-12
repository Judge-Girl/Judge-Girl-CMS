import React from 'react';
import TagsSection from './sections/TagsSection';
import ProvidedCodesSection from './sections/ProvidedCodesSection';
import SubmittedCodeSpec from './sections/SubmittedCodeSpec';
import ResourceSpecSection from './sections/ResourceSpecSection';
import CompilationScriptSection from './sections/CompilationScriptSection';
import VisibilitySection from './sections/VisibilitySection';
import ProblemDescriptionEditor from './sections/ProblemDescriptionEditor';

import TestcasesSection from './sections/testcases/TestcasesSection';
import ActionsSection from './sections/ActionsSection';
import ProblemTitleSection from './sections/ProblemTitleSection';
import {Divider} from './sections/commons/Divider';


const ProblemEditor = () => {
  return <>
    <div className="problem-editor">
      <ProblemTitleSection/>

      <TagsSection/>
      <Divider/>

      <ProvidedCodesSection/>
      <Divider/>

      <SubmittedCodeSpec/>
      <Divider/>

      <ResourceSpecSection/>
      <Divider/>

      <CompilationScriptSection/>
      <Divider/>

      {/*<OutputMatchPolicySection/>*/}
      {/*<Divider/>*/}

      <VisibilitySection/>
      <Divider/>

      <ProblemDescriptionEditor/>
      <Divider/>

      <TestcasesSection/>
      <Divider/>

      <ActionsSection/>
    </div>
  </>;
};

export default ProblemEditor;
