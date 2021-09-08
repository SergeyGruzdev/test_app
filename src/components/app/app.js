import React, { Component }             from 'react'
import { BrowserRouter as Router }      from 'react-router-dom'
import { withDataService }              from '../hoc-helpers'
import { AppProvider }                  from '../context'
import { connect }                      from 'react-redux'
import { fetchData, onMove }            from '../../actions'
import Spinner                          from '../spinner'
import ErrorIndicator                   from '../error-indicator'
import Header                           from '../header'
import {
    Route,
    Redirect,
    Switch
}                                       from 'react-router-dom'
import Tabs                             from '../tabs'
import ItemList                         from '../item-list'

class App extends Component {

    componentDidMount() {
        this.props.fetchData()
    }

    getTabs = (data) => Object.keys(data) || []

    getButtonsProps = name => {
        const keys = this.getTabs(this.props.data)
        const idx = keys.findIndex(item => item === name)
        const left = idx === 0
        const right = idx === keys.length - 1
        const toLeft = keys[idx-1]
        const toRight = keys[idx+1]
        return  {
            leftLabel: 'Move Left',
            rightLabel: 'Move Right',
            onMoveLeft:  left   ? null : ids => this.props.onMove({ from:name,to:toLeft,ids }),
            onMoveRight: right  ? null : ids => this.props.onMove({ from:name,to:toRight,ids })
        }
    }

    render() {
        const { data, loading, error } = this.props
        if (loading)
            return <Spinner />
        if (error)
            return <ErrorIndicator />

        return (
                <AppProvider value={ this.getButtonsProps }>
                    <Header />
                    <div className="container">
                        <div className="row panel">
                            {
                                this.getTabs(data).map((name, idx) =>
                                    <div key={ idx } className="col-md-4">
                                        <ItemList   name            = { name }
                                                    data            = { data[name] }
                                        />
                                    </div>
                                )
                            }
                            <Router>
                                <Switch>
                                    <Route path="/:name" render={({ match: { params: { name } } }) =>
                                        <div>
                                            <Tabs tabs={ this.getTabs(data) } page={ name } />
                                            <ItemList   name            = { name }
                                                        data            = { data[name] }
                                            />
                                        </div>
                                    }/>
                                    <Redirect to={ `/${this.getTabs(data)[0]}` } />
                                </Switch>
                            </Router>
                        </div>
                    </div>
                </AppProvider>
        )
    }
}

const mapStateToProps = ({ ...props }) => ({ ...props })
const mapDispatchtoProps = (dispatch, { dataService }) =>  (
    {
        fetchData: fetchData(dataService, dispatch),
        onMove: props => dispatch(onMove(props))
    }
)

export default withDataService()(connect(mapStateToProps, mapDispatchtoProps)(App))