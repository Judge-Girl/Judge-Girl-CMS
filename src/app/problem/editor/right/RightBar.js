import React from 'react';
import Tags from './Tags';
import ProvidedCodes from './ProvidedCodes';
import SubmittedCodeSpec from './SubmittedCodeSpec';
import ResourceSpec from './ResourceSpec';
import CompilationScript from './CompilationScript';
import OutputMatchPolicy from './OutputMatchPolicy';
import Visible from './Visible';
import ProblemDescription from './ProblemDescription';

import Testcases from './testcases/Testcases';
import Actions from './Actions';
import ProblemTitle from './ProblemTitle';
import {Divider} from './Divider';


const RightBar = () => {
	return <>
		<div className="right-bar">
			<ProblemTitle/>

			<Tags/>
			<Divider/>

			<ProvidedCodes/>
			<Divider/>

			<SubmittedCodeSpec/>
			<Divider/>

			<ResourceSpec/>
			<Divider/>

			<CompilationScript/>
			<Divider/>

			<OutputMatchPolicy/>
			<Divider/>

			<Visible/>
			<Divider/>

			<ProblemDescription/>
			<Divider/>

			<Testcases/>
			<Divider/>

			<Actions/>
		</div>
	</>;
};

export default RightBar;
