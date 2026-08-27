"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCart, getProduct, buyProduct, removeFromCart } from "@/lib/api";

export default function CartPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [cart, setCart] = useState([]);

  const loadCart = async (token) => {
    const res = await getCart(token);
    setCart(Array.isArray(res) ? res : []);
  };

  useEffect(() => {
    setUsername(localStorage.getItem("username") || "");
    loadCart(localStorage.getItem("usertoken"));
  }, []);

  const handleBuy = async (id) => {
    const token = localStorage.getItem("usertoken");
    const item = await getProduct(id, token);
    const res = await buyProduct(item, token);
    alert(res);
  };

  const handleRemove = async (id) => {
    const token = localStorage.getItem("usertoken");
    const res = await removeFromCart(id, token);
    alert(res);
    loadCart(token);
  };

  return (
    <>
      <link rel="stylesheet" href="/style/cart.css" />

      <div id="parent_div">
        <div id="left_div">
          <div id="left_div_1">
            <img width="30%" src="/Media/logo1.png" alt="" />
            <h4 style={{ color: "white", marginLeft: "5px" }}>HomeDecor</h4>
            <hr />
          </div>
          <div id="left_div_2">
            <div><button onClick={() => router.push("/")}>Home</button></div>
            <div><button> </button></div>
            <div><button> </button></div>
            <div><button> </button></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <hr />
          <div id="left_div_3"></div>
        </div>
        <div id="right_div">
          <div id="right_div_1">
            <div>
              <i className="fa-solid fa-magnifying-glass"></i>
              <input type="text" placeholder="CTRL K Search Anything..." />
              <i className="fa-regular fa-circle-question"></i>
              <i className="fa-solid fa-bell"></i>
            </div>
            <div id="adminName"><h5>Hello {username}</h5></div>
          </div>
          <div id="right_div_2">
            <div id="showAll">
              {cart.map((item) => (
                <div key={item._id}>
                  <div><img src={item.image} alt="" /></div>
                  <div><h5>{item.name}</h5></div>
                  <div>
                    <h5>${item.lowprice} </h5>
                    <h5> - ${item.highprice}</h5>
                  </div>
                  <div><h6>Rating: {item.rating}</h6></div>
                  <div>
                    <button className="cart" onClick={() => handleBuy(item._id)}>
                      <i className="fa-solid fa-cart-plus"></i> Buy
                    </button>
                    <button className="wishlist" onClick={() => handleRemove(item._id)}>
                      <i className="fa-solid fa-heart-circle-plus"></i> Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
