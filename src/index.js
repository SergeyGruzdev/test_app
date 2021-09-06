import { Provider }             from 'react-redux'
import React                    from 'react'
import ReactDom                 from 'react-dom'
import App                      from './components/app'
import ErrorBoundry             from './components/error-boundry'
import DataService              from './components/services/dataService'
import { DataServiceProvider }  from './components/context'
import store from './store'

const dataService = new DataService()
ReactDom.render(
    <Provider store={ store }>
        <ErrorBoundry>
            <DataServiceProvider value={dataService}>
                <App />
            </DataServiceProvider>
        </ErrorBoundry>
    </Provider>,
    document.getElementById('root'))
