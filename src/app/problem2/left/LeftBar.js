import {SECTIONS} from "./SectionManager";
import {useParams} from "react-router-dom";


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
        <div className="left-bar">
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
    </>;
}

export default LeftBar;