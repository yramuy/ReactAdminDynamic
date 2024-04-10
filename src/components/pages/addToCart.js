import { useSelector } from "react-redux";
import Layout from "../layout";
import { useState } from "react";

const AddToCart = () => {

    const [qty, setQty] = useState(1);
    let item = useSelector((state) => {
        return state.menuDetails;
    });

    const btnDecrement = () => {
        if (qty > 1) {
            setQty(qty - 1);
        }
    }

    const btnIncrement = () => {
        setQty(qty + 1);
    }

    var originalPrice = item.itemDetails.price * qty;
    var offer = item.itemDetails.offer; // 20%
    var discountAmount = originalPrice * (offer / 100);
    var discountedPrice = originalPrice - discountAmount;
    var payAmount = originalPrice - discountedPrice;

    console.log("itemDetails", item);

    return (
        <Layout>
            <div class="container-fluid mt-3">
                <div className="row" style={{ display: "flex", gap: "0px" }}>
                    <div class="col-sm-6 bg-primary1">
                        <div class="card" style={{ height: '32rem' }}>
                            <img class="card-img-top" src={item.itemDetails.item_img} alt="Card image" style={{ width: "65%", height: "18em" }} />
                            <div class="card-body">
                                <h4 class="card-title bold-text">{item.itemDetails.name}</h4>

                                <div class="col-md-6">
                                    <div class="input-group mt-5" style={{ display: 'flex', gap: '5px' }}>
                                        <button class="btn btn-danger1 btn-number rounded-button" data-type="minus" onClick={() => btnDecrement()}>-</button>
                                        <input type="text"
                                            id="quantity"
                                            name="quantity"
                                            class="form-control input-number"
                                            value={qty}
                                            min="1"
                                            style={{ textAlign: 'center' }} />
                                        <button class="btn btn-success1 btn-number rounded-button" data-type="plus" onClick={() => btnIncrement()}>+</button>
                                    </div>
                                </div>
                            </div>
                            <button class="btn btn-danger bold-text" style={{ backgroundColor: "#fb641b", color: "white", backgroundColor: "#fb641b", width: "15em", marginLeft: "14em" }}><i class="fas fa-cart-plus"></i> PLACE ORDER</button>
                        </div>
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
                                <div class="row mt-2">
                                    <div class="col">
                                        <p>Price (1 item)</p>
                                    </div>
                                    <div class="col">
                                        <p>₹ {originalPrice}</p>
                                    </div>
                                </div>
                                <div class="row mt-2">
                                    <div class="col">
                                        <p>Discount</p>
                                    </div>
                                    <div class="col">
                                        <p style={{ color: '#388e3c', fontWeight: 'bold' }}>− ₹ {discountedPrice}</p>
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
                                        <p style={{ color: 'black', fontWeight: 'bold' }}>₹ {payAmount}</p>
                                    </div>
                                </div>
                                <div class="row mt-2">
                                    <div class="col">
                                        <p style={{ color: '#388e3c', fontWeight: 'bold' }}>You will save ₹ {discountedPrice} on this order</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );

};

export default AddToCart;