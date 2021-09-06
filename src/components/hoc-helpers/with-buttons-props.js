import { AppConsumer } from "../context";

/*const withButtonsProps = Wrapped => props =>
    <AppConsumer>
        {
            buttonsProps => {
                const { name } = props
                const {leftLabel, rightLabel, onMoveLeft, onMoveRight} = buttonsProps(name)
                const newProps = {...props, leftLabel, rightLabel, onMoveLeft, onMoveRight }
                return <Wrapped {...newProps} />
            }
        }
    </AppConsumer>*/

const withButtonsProps = Wrapped => props =>
    <AppConsumer>
        {
            buttonsProps => {
                const { name, data } = props
                const { leftLabel, rightLabel, onMoveLeft, onMoveRight } = buttonsProps(name)
                const newProps = { name, data, leftLabel, rightLabel }

                return !onMoveLeft
                    ? <Wrapped { ...{ ...newProps, onMoveRight }}/>
                    : !onMoveRight
                        ? <Wrapped { ...{ ...newProps, onMoveLeft }}/>
                        : <Wrapped { ...{ ...newProps, onMoveLeft, onMoveRight }}/>
            }
        }
    </AppConsumer>

export default withButtonsProps