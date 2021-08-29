import React, {Component}   from 'react'
import Item                 from '../item'
import                      './item-list.css'

const withButtons = (location, onMoveLeft, onMoveRight, disabled = false) => {
    const { left,right } = location()
    return (
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
    )
}

class ItemList extends Component {

    state = {
        idsList: []
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.name !== prevProps.name || this.props.data.length < prevProps.data.length) {
            const list = prevProps.data.filter(item => !this.props.data.some(d => d.id === item.id)).map(i => i.id)
            const newState = prevState.idsList.filter(item => !list.some(i=> i === item))
            this.setState({ idsList: [...newState] })
        }
    }

    onCheckboxChange = (id) => {
        const idx = this.state.idsList.findIndex(el => el === id)
        this.setState
        (
            ({ idsList }) =>
            (
                {
                    idsList: idx < 0 ? [...idsList, id] : [...idsList.slice(0,idx), ...idsList.slice(idx + 1)]
                }
            )
        )
    }

    onCheckAllChange = (data) => {
        this.setState
        (
            ({idsList }) =>
            (
                {
                    idsList: idsList.length === data.length ? [] : data.map(item => item.id)
                }
            )
        )
    }

    render() {
        const { data, name, onMoveLeft, onMoveRight, location } = this.props
        const { idsList } = this.state
        const indeterminate = idsList.length < data.length && idsList.length > 0
        return (
            <div className="header-item" >
                <h2>{ name } page</h2>
                <div className="item-list">
                    <div className="form-check noPadding">
                        <input
                               type         ="checkbox"
                               className    ="form-check-input checkbox"
                               ref          ={ el => el ? el.indeterminate = indeterminate : null }
                               onChange     ={() => this.onCheckAllChange(data)}
                               checked      ={idsList.length === data.length && data.length > 0}
                        />
                    </div>
                    <div>
                        {
                            withButtons(
                                location,
                                () => onMoveLeft(name,idsList),
                                () => onMoveRight(name,idsList),
                                idsList.length === 0
                            )
                        }
                    </div>
                </div>
                <div>
                    <ul className="list-group itemColor">
                        {
                            data.map((item, idx) =>
                                <li key={ item.id } className="list-group-item">
                                    <Item
                                        label               ={`${ ++idx }. ${item.title}`}
                                        checked             ={ idsList.includes(item.id) }
                                        onCheckboxChange    ={ () => this.onCheckboxChange(item.id)}
                                        buttons             ={
                                                                withButtons(
                                                                    location,
                                                                    () => onMoveLeft(name,[item.id]),
                                                                    () => onMoveRight(name,[item.id])
                                                                )
                                                            }
                                    />
                                </li>
                            )
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

export default ItemList