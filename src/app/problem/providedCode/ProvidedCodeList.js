import React from 'react';
import ProvidedCodeForm from './ProvidedCodeForm';
import {SubtitleLine} from '../../commons/TitleLine';

function ProvidedCodeList () {
    return (
        <div>
            <SubtitleLine title={"Provided Code"} />
            <ProvidedCodeForm />
        </div>
    )
}

export default ProvidedCodeList;