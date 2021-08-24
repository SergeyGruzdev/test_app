const withItem = ({ isDraw, label, onBtnClick }) =>
    isDraw
        ?   <button
                className   =  "btn btn-info btn-sm btn-move"
                onClick     =  { onBtnClick }
            >
                Move { label }
            </button>
        :   null

export default withItem