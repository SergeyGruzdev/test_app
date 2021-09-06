const Item = ({label, checked, onCheckboxChange, buttonLeft, buttonRight}) =>
    <div className="item">
        <div className="form-check">
            <input
                className   ="form-check-input"
                type        ="checkbox"
                checked     ={ checked }
                onChange    ={ onCheckboxChange }
            />
            <span>{ label }</span>
        </div>
        <div>
            { buttonLeft }
            { buttonRight }
        </div>
    </div>

export default Item