import './button.css'

const Button = ({click, label, disabled = false}) =>
    <button
        disabled    ={ disabled }
        className   ="btn btn-info btn-sm btn-move"
        onClick     ={ click }
    >{ label }</button>

export default Button