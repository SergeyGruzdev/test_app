import { EventConsumer }    from '../event-context';
import { withItem }         from '../hoc-helpers';

//item
const Item = ({ item, idx, leftSide, rightSide, propName }) => {
    const {id, title} = item;
    return (
        <EventConsumer>
            {
                (onButtonClick) =>
                (
                    <li key={id} className="list-group-item">
                        <span>{++idx}. {title}</span>
                        {
                            withItem({
                                isDraw:     !rightSide,
                                label:      'Right',
                                onBtnClick: () => onButtonClick({ propName, id, toLeft: false })
                            })
                        }
                        {
                            withItem({
                                isDraw:     !leftSide,
                                label:      'Left',
                                onBtnClick: () => onButtonClick({ propName, id, toLeft: true })
                            })
                        }
                    </li>
                )
            }
        </EventConsumer>
    )
}

export default Item