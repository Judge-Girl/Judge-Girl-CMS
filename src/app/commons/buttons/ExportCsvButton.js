import './ExportCsvButton.scss'

const ExportCsvButton = ({onClick}) => {
    return (
        <button className="export-blue-btn"
                 onClick={onClick}>
                     Export CSV 
        </button>
    )
}

export {ExportCsvButton};