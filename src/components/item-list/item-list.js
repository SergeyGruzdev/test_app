import Item                 from '../item'
import                      './item-list.css'

const ItemList = ({propName, leftSide,rightSide, classView, data}) => {

    const items = data.map((item,idx) =>
       <Item    key         = { idx }
                item        = { item }
                idx         = { idx }
                propName    = { propName }
                leftSide    = { leftSide }
                rightSide   = { rightSide }
        />
    )

    return (
        <div className={`${classView}`}>
            <h2>{propName} page</h2>
            <ul className="list-group itemColor">
                {items}
            </ul>
        </div>
    )
}

export default ItemList