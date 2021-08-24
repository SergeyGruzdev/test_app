import React, { Component }             from 'react'
import { BrowserRouter as Router }      from 'react-router-dom'
import data                             from '../data-helper/data-helper'
import Header                           from '../header'
import TopPanel                         from '../top-panel'
import Pages                            from '../pages'
import { EventProvider }                from '../event-context'

export default class App extends Component {

    state           = data

    getFilterData   = (label) => this.state[label]
    onButtonClick   = ({propName,id, toLeft}) => {
        const idx = this.state[propName].findIndex(el => el.id === id);
        const eventItem = this.state[propName][idx];
        const props = Object.keys(data)
        const tabIdx = props.findIndex(el => el === propName)
        const newPropName = toLeft ? props[tabIdx - 1] : props[tabIdx + 1]
        this.setState
        (
            prevState =>
            (
                    {
                        [propName]      : [...prevState[propName].slice(0,idx), ...prevState[propName].slice(idx + 1)],
                        [newPropName]   : [...prevState[newPropName], eventItem]
                    }
            )
        )
    }

    render() {
        const tabs = Object.keys(this.state)

        return (
            <div>
                <Header />
                <EventProvider value={ this.onButtonClick }>
                <div className="container">
                    <div className="row panel">
                        <TopPanel   tabs={ tabs }   getData={ this.getFilterData } />
                        <Router>
                            <Pages  tabs={ tabs }   getData={ this.getFilterData } />
                        </Router>
                    </div>
                </div>
                </EventProvider>
            </div>
        )
    }
}