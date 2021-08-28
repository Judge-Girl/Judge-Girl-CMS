import '../../ProblemEditorOld.css';
import {AiOutlineClose} from "react-icons/ai";

// TODO: Moving the style fields into a separate .scss file.
function ProvidedCodeItems({files, removeFile}) {
    return files.map((file) => (
        <div className="provided-code-item" style={{
            position: "relative", width: "267px", minHeight: "33px", height: "fit-content"}}>
            <div style={{width: "85%", height: "100%", overflowWrap: "anywhere"}}>
                {file.name}
            </div>
            <div onClick={() => removeFile(file)}
                 style={{
                     width: "15%",
                     display: "flex", flexDirection: "row", justifyContent: "center",
                     cursor: "pointer",
                     position: "absolute",
                     top: "0", bottom: "0", right: "0"
                 }}>
                <AiOutlineClose size={15} style={{alignSelf: "center"}}/>
            </div>
        </div>
    ));
}

export default ProvidedCodeItems;
