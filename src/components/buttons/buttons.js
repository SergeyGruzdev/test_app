import './buttons.css'

const Buttons = ({left, right, onMoveLeft, onMoveRight, disabled = false}) =>
    <div>
        {
            !left
            ?   <button
                    disabled    = { disabled }
                    className   ="btn btn-info btn-sm btn-move"
                    onClick     ={ onMoveLeft }
                >Move Left</button>
            :   null
        }
        {
            !right
            ?   <button
                    disabled    = { disabled }
                    className   ="btn btn-info btn-sm btn-move"
                    onClick     ={ onMoveRight }
                >Move Right</button>
            :   null
        }
    </div>

export default Buttons