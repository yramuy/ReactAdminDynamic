import React, { useEffect, useState } from "react";
import Layout from "../layout";
import { useParams } from "react-router-dom";
import { PostApiService } from "../api";

const Menu = () => {
    const { levelId } = useParams();
    const Level = sessionStorage.getItem("Level");
    const subMenu = sessionStorage.getItem("subCat");
    const childSubcat = sessionStorage.getItem("childSubcat");
    const [items, setItems] = useState([]);

    useEffect(() => {
        GetItems();
    }, [levelId]);

    const GetItems = async () => {

        const url = "/AdminApis/v1/items";
        const body = JSON.stringify({
            id: levelId
        });

        await PostApiService(url, body).then((response) => {
            setItems(response.items);
        });

    }

    const cardStyle = {
        textDecoration: 'none', // Remove underline from the link
        color: 'inherit' // Use the default text color
    };

    return (
        <>
            <Layout>

                <div class="container">
                    <div className="row">
                        <div class="col-sm-3">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="#">{subMenu}</a></li>
                                <li class="breadcrumb-item active">{childSubcat}</li>
                            </ol>
                        </div>
                    </div>
                    <div class="row">

                        {/* <!-- Repeat this div dynamically for each item --> */}
                        {
                            items.length > 0 ? items.map((item) => (
                                <div class="col-md-4">
                                    <a href={`/item_details/${item.id}`} className="card-link" style={cardStyle}>
                                        <div class="card" style={{height: "335px"}}>
                                            <img src={item.item_img} class="card-img-top" alt="..." style={{ height: "11em", width: "18em", position: "relative", top: "10px" }} />
                                            <div class="card-body">
                                                <h5 class="card-title"><b>{item.name}</b></h5>

                                                <p class="card-text"><b>₹{item.price}</b> <br /> Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                                {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
                                            </div>
                                        </div>
                                    </a>

                                </div>
                            )) : "No Items"
                        }
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default Menu;