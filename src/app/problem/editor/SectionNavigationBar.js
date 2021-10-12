import React from 'react';
import {useParams} from 'react-router-dom';


const SECTIONS = [
  {name: 'Tags', id: 'problem-editor-tags'},
  {name: 'Provided Code', id: 'problem-editor-provided-code'},
  {name: 'Submitted Code Spec', id: 'problem-editor-submitted-code-spec'},
  {name: 'Resource Spec', id: 'problem-editor-resource-spec'},
  {name: 'Compilation Script', id: 'problem-editor-compilation-script'},
  {name: 'Output Match Policy', id: 'problem-editor-output-match-policy'},
  {name: 'Visible', id: 'problem-editor-visible'},
  {name: 'Description', id: 'problem-editor-description'},
  {name: 'Test Cases', id: 'problem-editor-testcases'},
  {name: 'Actions', id: 'problem-editor-actions'}
];

const SectionNavigationBar = () => {
  const {problemId} = useParams();

  const backToTop = e => {
    e.preventDefault();
    document.body.scrollIntoView({behavior: 'smooth'});
  };

  const scrollToSection = (elementId, e) => {
    e.preventDefault();
    document.getElementById(elementId)?.scrollIntoView({behavior: 'smooth'});
  };

  return <>
    <div className="section-nav-bar">
      <div className="nav-bar">
        <a key="#"
           href={`/problems/${problemId}/edit`}
           onClick={backToTop}>
          ID: {problemId}
        </a>

        {SECTIONS.map(section =>
          <a key={section.id}
             href={`#${section.id}`}
             onClick={e => scrollToSection(section.id, e)}>
            {section.name}
          </a>)
        }
      </div>
    </div>
  </>;
};

export default SectionNavigationBar;
