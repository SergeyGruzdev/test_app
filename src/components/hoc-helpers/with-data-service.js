import { DataServiceConsumer } from "../data-service-context";

const withDataService = () => (Wrapped) => (props) =>
    <DataServiceConsumer>
        {
            (dataService) => <Wrapped {... props} dataService={dataService} />
        }
    </DataServiceConsumer>

export default withDataService