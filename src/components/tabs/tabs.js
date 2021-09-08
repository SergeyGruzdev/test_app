import { Link }                 from 'react-router-dom'
import                          './tabs.css'

const Tabs = ({ tabs, page }) => {

    const items = tabs.map((item,idx) => {
        const active = page === item ? 'active' : ''
        return (
            <li key={ idx } className="nav-item floating">
                <Link   className   ={ `nav-link ${ active }` }
                        to          ={ `/${item}` }
                    >{ item }
                </Link>
            </li>
        )
    })

    return (
        <div className="tab-panel nav nav-tabs">
            <ul className="nav">
                { items }
            </ul>
        </div>
    )
}

export default Tabs