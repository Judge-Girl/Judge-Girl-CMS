import "./leftbar.scss";
import {SECTIONS} from "./SectionManager";
import {useParams} from "react-router-dom";


// TODO: UX idea:
//   Option1: Dim other sections, when the section is clicked.
//   Option2: Blink the background of the target section.
const LeftBar = () => {
    const {problemId} = useParams();

    const backToTop = e => {
        e.preventDefault();
        document.body.scrollIntoView({behavior: "smooth"});
    };

    const scrollToSection = (tagId, e) => {
        e.preventDefault();
        document.getElementById(tagId)?.scrollIntoView({behavior: 'smooth'});
    };

    return <>
        <div className="problem-editor-leftbar" style={{
            display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-end",
            position: "fixed", width: "200px"}}>
            <a key="#" href="#" onClick={backToTop}>
                ID: {problemId}
            </a>
        {SECTIONS.map(section =>
            <a key={section.id} href={`#${section.id}`} onClick={e => scrollToSection(section.id, e)}>
                {section.name}
            </a>)
        }
        </div>
    </>;
}

export default LeftBar;