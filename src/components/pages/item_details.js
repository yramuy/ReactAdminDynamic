import { useNavigate, useParams } from "react-router-dom";
import Layout from "../layout";
import { useEffect, useState } from "react";
import { PostApiService } from "../api";
import { useDispatch } from "react-redux";

const ItemDetails = () => {
    const { itemId } = useParams();
    const [itemDetails, setItemDetails] = useState([]);
    const [discount, setDiscount] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        GetItemDetails();
    }, [itemId]);

    const GetItemDetails = async () => {

        const url = "/AdminApis/v1/itemDetails";
        
        const body = JSON.stringify({
            item_id: itemId
        });

        await PostApiService(url, body).then((data) => {
            if (data.status === 1) {
                var response = data.itemDetails[0];
                setItemDetails(response);
                dispatch({ type: "LEVEL1", payload: response.cat_id});
                dispatch({ type: "LEVEL2", payload: response.sub_cat_id});
                dispatch({ type: "LEVEL3", payload: response.sub_cat_child_id});
                dispatch({ type: "ITEM", payload: response});
            } else {
                setItemDetails([]);
            }
        });
    }

    var originalPrice = itemDetails.price;
	var offer = itemDetails.offer; // 20%
	var discountAmount = originalPrice * (offer / 100);
	var discountedPrice = originalPrice - discountAmount;
    var payAmount = originalPrice - discountedPrice;

    const addToCart = () => {
        navigate(`/addToCart/${itemId}`);
    }


    console.log(itemDetails)
    return (
        <Layout>
            <div class="container-fluid mt-3">
                <div className="row" style={{ display: "flex", gap: "0px" }}>
                    <div class="col-sm-6 bg-primary1">
                        <div class="card" style={{ height: '32rem' }}>
                            <img class="card-img-top" src={itemDetails.item_img} alt="Card image" style={{ width: "65%", height: "18em" }} />
                            <div class="card-body">
                                <h4 class="card-title bold-text">{itemDetails.name}</h4>
                                <p class="card-text">{itemDetails.description}</p>
                                <p style={{ display: "flex", gap: "10px" }}>
                                    <button class="btn btn-warning bold-text" style={{ backgroundColor: "#ff9f00", color: "white" }} onClick={() => addToCart()}><i class="fas fa-cart-plus"></i> ADD TO CART</button>
                                    <a href="#" class="btn btn-primary bold-text" style={{ backgroundColor: "#fb641b", color: "white" }}><i class="fab fa-buysellads"></i> BUY NOW</a>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6 bg-dark1">
                        <div class="card" style={{ height: '32rem' }}>
                            <div class="card-body">
                                <h4 class="card-title mb-2 bold-text">{itemDetails.name}</h4>
                                <p class="card-text bold-text" style={{ color: '#26a541'}}>Special price</p>
                                <p class="card-text bold-text"><span style={{fontSize: '1.5rem' }}>₹{payAmount}</span>
                                    <span class="crossed-price" style={{ fontSize: '16px', marginLeft: '10px', verticalAlign: 'middle', color: '#878787' }}>₹{discountedPrice}</span>
                                    <span className="bold-text" style={{ marginLeft: '12px', color: '#26a541', fontSize: '1.1rem' }}>{itemDetails.offer}% off</span>

                                </p>
                                <div class="curved-rectangle text-white">{itemDetails.rating} &#9733;</div>
                                <p>
                                    <h5>Available Offers</h5>
                                    <ul class="list-group list-group-flush">

                                        <li class="list-group-item"><img src="https://rukminim2.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90" width="18" height="18" class="_3HLfAg" /> Bank Offer: 10% instant discount on ICICI Bank Credit Cards, up to ₹300, on orders of ₹2,500 and above <small class="text-muted">T&C</small></li>
                                        <li class="list-group-item"><img src="https://rukminim2.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90" width="18" height="18" class="_3HLfAg" />Bank Offer: Get ₹25* instant discount for the 1st Flipkart Order using Flipkart UPI <small class="text-muted">T&C</small></li>
                                        <li class="list-group-item"><img src="https://rukminim2.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90" width="18" height="18" class="_3HLfAg" />Bank Offer: 10% off on Citi-branded Credit Card EMI Transactions, up to ₹2,000 on orders of ₹5,000 and above <small class="text-muted">T&C</small></li>
                                    </ul>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ItemDetails;