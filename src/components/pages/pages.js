import {
    Route,
    Redirect,
    Switch
}                               from 'react-router-dom'
import Tabs                     from '../tabs'
import ItemList                 from '../item-list'

const Pages = ({ tabs, getData }) =>  <Switch>
                                        <Route
                                            path    = '/:direction'
                                            render  =
                                            {
                                                ({ match: { params: { direction } } }) => {
                                                    const leftSide = tabs.findIndex(item => item === direction) === 0
                                                    const rightSide = tabs.findIndex(item => item === direction) === tabs.length - 1
                                                    return tabs.findIndex(item => item === direction) >= 0
                                                    ?
                                                        (
                                                            <div>
                                                                <Tabs tabs={tabs} page={direction} />
                                                                <ItemList   leftSide    = { leftSide }
                                                                            rightSide   = { rightSide }
                                                                            propName    = { direction }
                                                                            data        = { getData(direction) } />
                                                            </div>
                                                        )
                                                    : <Redirect to={ `/${tabs[0]}` }/>
                                                }
                                            }
                                        />
                                        <Redirect to={ `/${tabs[0]}` }/>
                                    </Switch>

export default Pages