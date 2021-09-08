import React, {Component}   from 'react'
import { withButtonsProps } from '../hoc-helpers'
import Item                 from '../item'
import Button               from '../button'
import                      './item-list.css'

const onMoveDefault = () => {}

class ItemList extends Component {

    state = {
        idsList: []
    }

    static defaultProps = {
        onMoveLeft: onMoveDefault,
        onMoveRight: onMoveDefault
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.name !== prevProps.name || this.props.data.length < prevProps.data.length) {
            const list = prevProps.data.filter(item => !this.props.data.some(d => d.id === item.id)).map(i => i.id)
            const newState = prevState.idsList.filter(item => !list.some(i=> i === item))
            this.setState({ idsList: [...newState] })
        }
    }

    onCheckboxChange = id => {
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

    onCheckAllChange = data => {
        this.setState
        (
            ({ idsList }) =>
            (
                {
                    idsList: idsList.length === data.length ? [] : data.map(item => item.id)
                }
            )
        )
    }

    getButton = ({ ids, label, onMove }) =>
        onMove !== onMoveDefault
            ?   <Button
                    click       ={ () => onMove(ids) }
                    label       ={ label }
                    disabled    ={ ids.length === 0 }
                />
            : null

    render() {
        const { data, name, leftLabel, rightLabel, onMoveLeft, onMoveRight } = this.props
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
                        {
                            this.getButton({ ids: idsList, label: leftLabel, onMove: onMoveLeft })
                        }
                        {
                            this.getButton({ ids: idsList, label: rightLabel, onMove: onMoveRight })
                        }
                    </div>
                </div>
                <div>
                    <ul className="list-group-numbered itemColor">
                        {
                            data.map( item =>
                                <li key={ item.id } className="list-group-item d-flex justify-content-between align-items-start">
                                    <Item
                                        label               ={ item.title }
                                        checked             ={ idsList.includes(item.id) }
                                        onCheckboxChange    ={ () => this.onCheckboxChange(item.id) }
                                    >
                                    {
                                        this.getButton({ ids: [item.id], label: leftLabel, onMove: onMoveLeft })
                                    }
                                    {
                                        this.getButton({ ids: [item.id], label: rightLabel, onMove: onMoveRight })
                                    }
                                    </Item>
                                </li>
                            )
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

export default withButtonsProps(ItemList)
