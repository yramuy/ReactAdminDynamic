import React from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import './App.css';
import Layout from "./components/layout";
import Dashboard from "./components/layout/dashboard";
import Users from "./components/pages/users";
import Login from "./components/pages/login";
import Logout from "./components/logout";
import Category from "./components/pages/category";
import Signup from "./components/pages/signup";
import Menu from "./components/pages/menu";
import ItemDetails from "./components/pages/item_details";
import AddToCart from "./components/pages/addToCart";
import AddTimesheet from "./components/pages/addTimesheet";
import SaveTimesheetItem from "./components/pages/saveTimesheetItem";

function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/category" element={<Category />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/menu/:levelId" element={<Menu />}/>
          <Route path="/item_details/:itemId" element={<ItemDetails />}/>
          <Route path="/addToCart/:item" element={<AddToCart />}/>
          <Route path="/addTimesheet" element={<AddTimesheet />}/>
          <Route path="/saveTimesheetItem" element={<SaveTimesheetItem />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
