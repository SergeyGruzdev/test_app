const Item = ({label, checked, onCheckboxChange, buttons}) =>
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
        { buttons }
    </div>

export default Item