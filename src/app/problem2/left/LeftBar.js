import "./leftbar.scss";
import {useParams} from "react-router-dom";
import {SECTIONS} from "./SectionManager";


const LeftBar = () => {
    // TODO: Use state to imple. the effect:
    //   Option1: Dim other sections, when the section is clicked
    //   Option2: Blink the background of the target section.
    const {problemId} = useParams()

    const backToTop = e => {
        e.preventDefault();
        document.body.scrollIntoView({behavior: "smooth"});
    };

    const scrollToSection = (tagId, e) => {
        e.preventDefault();
        const target = document.getElementById(tagId)
        target && target.scrollIntoView({
            behavior: 'smooth',
            // block: 'center',
            // inline: 'center'
        });
    };

    return <>
        <div className="problem-editor-leftbar"
             style={{
                 display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-end",
                 position: "fixed", width: "200px",
             }}>
            <a href="#" onClick={backToTop}>
                ID: {problemId}
            </a>
            {SECTIONS.map(section =>
                <a href={`#${section.id}`}
                   onClick={e => scrollToSection(section.id, e)}>
                    {section.name}
                </a>)
            }
        </div>
    </>;
}

export default LeftBar;