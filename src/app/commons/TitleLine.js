import './TitleLine.css'
import * as React from "react";

const SubtitleLine = function ({title}) {
    return TitleLine({
        title, fontSize: "17px",
        color: "#6D6E7D", shadow: false, lineColor: '#A2A3B1', marginY: 1
    });
};

const TitleLine = function ({
                                title, fontSize = '35px', alignment = 'left',
                                color = '#374550', shadow = true, fontWeight = 'bold',
                                lineColor = '#E4E1E1', marginY=4
                            }) {
    const textShadow = shadow ? '2px 2px 0 rgba(0, 0, 0, 0.25)' : '0';
    return (
        <div className={`has-text-${alignment}`}>
            <p className="title-font" style={{fontSize, color, textShadow, fontWeight}}>
                {title}
            </p>
            <hr className={`my-${marginY}`} style={{backgroundColor: lineColor}}/>
        </div>
    )
};

export {TitleLine, SubtitleLine};
