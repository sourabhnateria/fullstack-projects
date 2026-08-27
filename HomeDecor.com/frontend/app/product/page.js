"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getProductsByCategory, getProduct, addToCart } from "@/lib/api";

export default function ProductPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setUsername(localStorage.getItem("username") || "");
    const token = localStorage.getItem("usertoken");
    const category = localStorage.getItem("category");
    getProductsByCategory(category, token).then((res) => setProducts(Array.isArray(res) ? res : []));
  }, []);

  const handleCart = async (id) => {
    const token = localStorage.getItem("usertoken");
    const item = await getProduct(id, token);
    const res = await addToCart(item, token);
    alert(res);
  };

  return (
    <>
      <link rel="stylesheet" href="/style/product.css" />

      <div id="parent_div">
        <div id="left_div">
          <div id="left_div_1">
            <img width="30%" src="/Media/logo1.png" alt="" />
            <h4 style={{ color: "white", marginLeft: "5px" }}>HomeDecor</h4>
          </div>
          <div id="left_div_2">
            <div><button onClick={() => router.push("/")}>Home</button></div>
            <div><button>Category</button></div>
            <div><button>Discounts</button></div>
            <div><button>Size</button></div>
            <div><button>Color</button></div>
            <div><button>Fabric</button></div>
            <div><button>Latest Arrivals</button></div>
          </div>
          <hr />
          <div id="left_div_3"></div>
        </div>
        <div id="right_div">
          <div id="right_div_1">
            <div>
              <i className="fa-solid fa-magnifying-glass"></i>
              <input type="text" placeholder="CTRL K Search Anything..." />
              <a href="/cart"><i style={{ color: "black" }} className="fa-solid fa-cart-shopping"></i></a>
              <i className="fa-regular fa-circle-question"></i>
              <i className="fa-solid fa-bell"></i>
            </div>
            <div id="adminName"><h5>Hello {username}</h5></div>
          </div>
          <div id="right_div_2">
            <div id="showAll">
              {products.map((item) => (
                <div key={item._id}>
                  <div><img src={item.image} alt="" /></div>
                  <div><h5>{item.name}</h5></div>
                  <div>
                    <h5>${item.lowprice} </h5>
                    <h5> - ${item.highprice}</h5>
                  </div>
                  <div><h6>Rating: {item.rating}</h6></div>
                  <div>
                    <button className="cart" onClick={() => handleCart(item._id)}>
                      <i className="fa-solid fa-cart-plus"></i> Cart
                    </button>
                    <button className="wishlist">
                      <i className="fa-solid fa-heart-circle-plus"></i> Wishlist
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
