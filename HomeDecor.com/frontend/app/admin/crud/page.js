"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  showUsers,
  deleteUser,
} from "@/lib/api";

const EMPTY_PRODUCT = { image: "", name: "", rating: "", lowprice: "", highprice: "", quantity: "", category: "" };

export default function AdminCrudPage() {
  const router = useRouter();
  const [adminName, setAdminName] = useState("");
  const [view, setView] = useState("none"); // none | add | products | users | update

  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [addForm, setAddForm] = useState(EMPTY_PRODUCT);
  const [updateForm, setUpdateForm] = useState(EMPTY_PRODUCT);
  const [updateId, setUpdateId] = useState(null);

  useEffect(() => {
    setAdminName(localStorage.getItem("admin") || "");
  }, []);

  const token = () => localStorage.getItem("token");

  const loadProducts = async () => {
    const res = await getProducts(token());
    setProducts(Array.isArray(res) ? res : []);
    setView("products");
  };

  const loadUsers = async () => {
    const res = await showUsers();
    setUsers(Array.isArray(res) ? res : []);
    setView("users");
  };

  const handleAddField = (field) => (e) => setAddForm({ ...addForm, [field]: e.target.value });

  const submitAdd = async () => {
    const msg = await addProduct(addForm, token());
    alert(msg);
    setAddForm({ ...EMPTY_PRODUCT, category: addForm.category });
  };

  const startUpdate = async (id) => {
    setUpdateId(id);
    const res = await getProduct(id, token());
    setUpdateForm({
      image: res.image,
      name: res.name,
      rating: res.rating,
      lowprice: res.lowprice,
      highprice: res.highprice,
      quantity: res.quantity,
      category: res.category,
    });
    setView("update");
  };

  const handleUpdateField = (field) => (e) => setUpdateForm({ ...updateForm, [field]: e.target.value });

  const submitUpdate = async () => {
    const msg = await updateProduct(updateId, updateForm, token());
    alert(msg);
    loadProducts();
  };

  const handleDeleteProduct = async (id) => {
    const msg = await deleteProduct(id, token());
    alert(msg);
    loadProducts();
  };

  const handleDeleteUser = async (id) => {
    const msg = await deleteUser(id);
    alert(msg);
    loadUsers();
  };

  return (
    <>
      <link rel="stylesheet" href="/style/adminCRUD.css" />

      <div id="parent_div">
        <div id="left_div">
          <div id="left_div_1">
            <img width="30%" src="/Media/logo1.png" alt="" />
            <h4>HomeDecor</h4>
          </div>
          <div id="left_div_2">
            <div><button onClick={loadProducts}>Show Products</button></div>
            <div><button onClick={() => setView("add")}>Add Products</button></div>
            <div><button onClick={loadUsers}>Show Users</button></div>
            <div><button onClick={() => router.push("/")}>Logout</button></div>
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
            <div id="adminName"><h5>Hello {adminName}</h5></div>
          </div>
          <div id="right_div_2">
            {view === "add" && (
              <div id="showAdd">
                <div id="register">
                  <input type="text" placeholder="Enter Pdt Image" value={addForm.image} onChange={handleAddField("image")} />
                  <input type="text" placeholder="Enter Name" value={addForm.name} onChange={handleAddField("name")} />
                  <input type="number" placeholder="Enter Rating" value={addForm.rating} onChange={handleAddField("rating")} />
                  <input type="number" placeholder="Enter Low Price" value={addForm.lowprice} onChange={handleAddField("lowprice")} />
                  <input type="number" placeholder="Enter High Price" value={addForm.highprice} onChange={handleAddField("highprice")} />
                  <input type="number" placeholder="Enter Quantity" value={addForm.quantity} onChange={handleAddField("quantity")} />
                  <input type="text" placeholder="Enter Category" value={addForm.category} onChange={handleAddField("category")} />
                  <input type="submit" id="btn" onClick={submitAdd} value="Add Product" />
                </div>
              </div>
            )}

            {view === "products" && (
              <div id="showAll">
                {products.map((item) => (
                  <div key={item._id}>
                    <div><img src={item.image} alt="" /></div>
                    <div><h5>{item.name}</h5></div>
                    <div>
                      <h5>${item.lowprice} </h5>
                      <h5> - ${item.highprice}</h5>
                    </div>
                    <div>
                      <h6><span>Qty: </span> {item.quantity}</h6>
                      <h6>Rating: {item.rating}</h6>
                    </div>
                    <div><h6>Category-{item.category}</h6></div>
                    <div>
                      <button className="delete-btn" onClick={() => handleDeleteProduct(item._id)}>Delete</button>
                      <button className="update-btn" onClick={() => startUpdate(item._id)}>Update</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {view === "users" && (
              <div id="showUser">
                {users.map((item) => (
                  <div key={item._id}>
                    <div><h5>Name: {item.name}</h5></div>
                    <div><h5>Email: {item.email} </h5></div>
                    <div><h5>Mobile: {item.mob}</h5></div>
                    <div><button onClick={() => handleDeleteUser(item._id)}>Delete</button></div>
                  </div>
                ))}
              </div>
            )}

            {view === "update" && (
              <div id="updatePdt">
                <div id="register1">
                  <label>Name</label>
                  <input type="text" placeholder="Enter Name" value={updateForm.name} onChange={handleUpdateField("name")} />
                  <label>Image</label>
                  <input type="text" placeholder="Enter Pdt Image" value={updateForm.image} onChange={handleUpdateField("image")} />
                  <label>Rating</label>
                  <input type="number" placeholder="Enter Rating" value={updateForm.rating} onChange={handleUpdateField("rating")} />
                  <label>Low Price</label>
                  <input type="number" placeholder="Enter Low Price" value={updateForm.lowprice} onChange={handleUpdateField("lowprice")} />
                  <label>High Price</label>
                  <input type="number" placeholder="Enter High Price" value={updateForm.highprice} onChange={handleUpdateField("highprice")} />
                  <label>Quantity</label>
                  <input type="number" placeholder="Enter Quantity" value={updateForm.quantity} onChange={handleUpdateField("quantity")} />
                  <label>Category</label>
                  <input type="text" placeholder="Enter Category" value={updateForm.category} onChange={handleUpdateField("category")} />
                  <input type="submit" id="updatebtn" onClick={submitUpdate} value="Update Product" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
