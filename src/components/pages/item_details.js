import { useParams } from "react-router-dom";
import Layout from "../layout";

const ItemDetails = () => {
    const { itemId } = useParams();
    return (
        <Layout>
            <h2>Item Page {itemId}</h2>
        </Layout>
    );
};

export default ItemDetails;