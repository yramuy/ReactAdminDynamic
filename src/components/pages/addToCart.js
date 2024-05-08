import { useSelector, useDispatch } from "react-redux";
import Layout from "../layout";
import { useEffect, useState } from "react";
import { GetApiService, PostApiService } from "../api";
import { useNavigate, useParams } from "react-router-dom";

const AddToCart = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [qty, setQty] = useState(1);
    const loginUserId = sessionStorage.getItem('userId');
    const [items, setItems] = useState([]);
    const [priceDetails, setPriceDetails] = useState([]);

    let item = useSelector((state) => {
        return state.menuDetails;
    });

    var originalPrice = item.itemDetails.price * qty;
    var offer = item.itemDetails.offer; // 20%
    var discountAmount = originalPrice * (offer / 100);
    var discountedPrice = originalPrice - discountAmount;
    var payAmount = originalPrice - discountedPrice;
    var itemId = item.itemDetails.id;

    useEffect(() => {
        GetCartItems();
        setTimeout(() => dispatch({ type: 'SNACKBAR', payload: false }), 6000);
        setTimeout(() => dispatch({ type: 'FLAG', payload: false }), 6000);
    }, [item.flag]);

    const btnIncrement = (id, AddAction, value) => {
        addToCartItem(id, AddAction);
    }

    const btnDecrement = (id, UpdateAction, value) => {

        if (parseInt(value) >= 1) {
            addToCartItem(id, UpdateAction);
        }

    }

    const GetCartItems = async () => {
        const url = "/AdminApis/v1/cartItems";

        await GetApiService(url).then((response) => {
            setItems(response.cartItems);
            setPriceDetails(response.price_details);
            dispatch({ type: "BADGE", payload: response.cartItems.length });
        });
    }

    const addToCartItem = async (id, action) => {
        console.log('quantity', qty)
        console.log('id', id)
        const url = "/AdminApis/v1/addToCart";

        const body = JSON.stringify({
            item_id: id,
            quantity: qty,
            original_price: originalPrice,
            discount_price: discountedPrice,
            total_price: payAmount,
            added_by: loginUserId,
            payment_status: 0,
            act: action
        });

        await PostApiService(url, body).then((response) => {
            dispatch({ type: "DISPLAYMSG", payload: response.message });
            dispatch({ type: "SNACKBAR", payload: true });
            dispatch({ type: "FLAG", payload: true });
            navigate(`/addToCart/${itemId}`);
        });

    }

    const removeItem = async (removeItemId) => {
        const url = "/AdminApis/v1/removeItem";

        const body = JSON.stringify({
            item_id: removeItemId
        });

        await PostApiService(url, body).then((response) => {
            dispatch({ type: "DISPLAYMSG", payload: response.message });
            dispatch({ type: "SNACKBAR", payload: true });
            dispatch({ type: "FLAG", payload: true });
            navigate(`/addToCart/${itemId}`);
        });
    }



    console.log("itemDetails", item);
    console.log("priceDetails", priceDetails);
    // console.log("items", items[0]['originalTotal']);

    return (
        <Layout>
            <div class="container-fluid mt-3">
                <div className="row" style={{ display: "flex", gap: "0px" }}>
                    <div class="col-sm-6 bg-primary1">
                        {
                            items.length > 0 ? (<div class="card">

                                <div class="card-body">
                                    {

                                        items.map((cart) => (

                                            <div className="row">
                                                <div className="col-sm-7">
                                                    <img class="card-img-top mt-3" src={cart.image} alt="Card image" style={{ width: "50%", height: "6em" }} />

                                                    <div class="input-group mt-3" style={{ display: 'flex', gap: '5px' }}>
                                                        <button class="btn btn-danger1 btn-number rounded-button" data-type="minus" onClick={() => btnDecrement(cart.item_id, 'updateMinus', cart.quantity)}>-</button>
                                                        <input type="text"
                                                            id="quantity"
                                                            name="quantity"
                                                            class="form-control1 input-number"
                                                            value={cart.quantity}
                                                            min="1"
                                                            style={{ textAlign: 'center', width: '50px' }} />
                                                        <button class="btn btn-success1 btn-number rounded-button" data-type="plus" onClick={() => btnIncrement(cart.item_id, 'updatePlus', cart.quantity)}>+</button>
                                                        <a class="btn btn-number rounded-button" data-type="plus" onClick={() => removeItem(cart.item_id)}>REMOVE</a>
                                                        {/* <button class="btn btn-danger bold-text">REMOVE</button> */}
                                                    </div>


                                                </div>
                                                <div className="col-sm-5 mt-1">
                                                    <p><b>{cart.name}</b></p>
                                                    <p><span class="crossed-price" style={{ fontSize: '16px', marginLeft: '10px', verticalAlign: 'middle', color: '#878787' }}>₹ {cart.original_price}</span> <b>₹ {cart.total_price}</b><br /> <span style={{ color: '#388e3c', fontWeight: 'bold' }}>{cart.offer}% Off</span></p>
                                                </div>
                                            </div>
                                        ))
                                    }


                                </div>
                                <button class="btn btn-danger bold-text" style={{ backgroundColor: "#fb641b", color: "white", backgroundColor: "#fb641b", width: "10em", marginLeft: "18em", marginBottom: "2em" }}><i class="fas fa-cart-plus"></i> PLACE ORDER</button>
                            </div>) : (<div class="card">
                                <div class="card-body">
                                    <h6 class="row">No items found!</h6>
                                </div>
                            </div>)
                        }

                    </div>
                    <div class="col-sm-6 bg-dark1">
                        <div class="card" style={{ height: '32rem' }}>
                            <div class="card-body">
                                {/* <h4 class="card-title bold-text">PRICE DETAILS</h4> */}
                                <div class="row">
                                    <div class="col-4">
                                        <h4 class="card-title bold-text">PRICE DETAILS</h4>
                                    </div>
                                </div>

                                {
                                    items.length > 0 ? (
                                        <div>
                                            <div class="row mt-2">
                                                <div class="col">
                                                    <p>Price ({items.length})</p>
                                                </div>
                                                <div class="col">
                                                    <p>₹ {priceDetails.originalTotal}</p>
                                                </div>
                                            </div>
                                            <div class="row mt-2">
                                                <div class="col">
                                                    <p>Discount</p>
                                                </div>
                                                <div class="col">
                                                    <p style={{ color: '#388e3c', fontWeight: 'bold' }}>− ₹ {priceDetails.discountTotal}</p>
                                                </div>
                                            </div>
                                            <div class="row mt-2">
                                                <div class="col">
                                                    <p>Delivery Charges</p>
                                                </div>
                                                <div class="col">
                                                    <p>Free</p>
                                                </div>
                                            </div>
                                            <div class="row mt-2">
                                                <div class="col">
                                                    <p style={{ color: 'black', fontWeight: 'bold' }}>Total Amount</p>
                                                </div>
                                                <div class="col">
                                                    <p style={{ color: 'black', fontWeight: 'bold' }}>₹ {priceDetails.finalTotal}</p>
                                                </div>
                                            </div>
                                            <div class="row mt-2">
                                                <div class="col">
                                                    <p style={{ color: '#388e3c', fontWeight: 'bold' }}>You will save ₹ {priceDetails.discountTotal} on this order</p>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (<div class="row mt-2">
                                        <h6>No price details</h6>
                                    </div>)
                                }

                            </div>
                        </div>
                    </div>
                </div>

                {item.snackbar && <div className="alert alert-success position-fixed bottom-0 end-0" role="alert">
                    {item.message}
                </div>}
            </div>
        </Layout>
    );

};

export default AddToCart;