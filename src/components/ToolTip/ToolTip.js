import './ToolTip.css';

export default function ToolTip (props) {
    return (
        <div className={`toolTip ${props.isVisible && 'toolTip_open'}`}>
            <p className="toolTip__text">
                Данные успешно обновлены
            </p>
            <button type="button" className="toolTip__button" onClick={props.closeToolTip}>ОК</button>
        </div>
    )
}