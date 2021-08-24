import ItemList                 from '../item-list'
import                          './top-panel.css'

const TopPanel = ({getData, tabs}) => {

    const items = tabs.map((item,idx,array)=>
        <ItemList   key         = { idx }
                    leftSide    = { idx === 0 }
                    rightSide   = { idx === (array.length > 1 ? array.length - 1 : 0) }
                    propName    = { item }
                    data        = { getData(item) }
                    classView   = "col-md-4"
        />
    )

    return (
        <div className="row">
            {items}
        </div>
    )
}

export default TopPanel