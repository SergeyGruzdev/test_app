import React, {Component}   from 'react'
import Item                 from '../item'
import Buttons              from '../buttons'
import                      './item-list.css'

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
        const { data, name, buttonsProps } = this.props
        const { left, right, onMoveLeft, onMoveRight } = buttonsProps()
        const { idsList } = this.state
        const indeterminate = idsList.length < data.length && idsList.length > 0
        return (
            <div className="header-item" >
                <h2>{ name } page</h2>
                <div className="item-list">
                    <div className="form-check noPadding">
                        <input
                               type         ="checkbox"
                               disabled     ={ data.length === 0 }
                               className    ="form-check-input checkbox"
                               ref          ={ el => el ? el.indeterminate = indeterminate : null }
                               onChange     ={ () => this.onCheckAllChange(data) }
                               checked      ={ idsList.length === data.length && data.length > 0 }
                        />
                    </div>
                    <div>
                        <Buttons
                            left        = { left }
                            right       = { right }
                            onMoveLeft  = { () => onMoveLeft(idsList) }
                            onMoveRight = { () => onMoveRight(idsList) }
                            disabled    = { idsList.length === 0 }
                        />
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
                                                                <Buttons
                                                                    left        = { left }
                                                                    right       = { right }
                                                                    onMoveLeft  = { () => onMoveLeft([item.id]) }
                                                                    onMoveRight = { () => onMoveRight([item.id]) }
                                                                />
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