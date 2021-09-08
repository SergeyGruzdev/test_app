const Item = ({ label, checked, onCheckboxChange, ...props }) =>
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
            { props.children }
        </div>
    </div>

export default Item