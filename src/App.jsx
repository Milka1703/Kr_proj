import React from "react";
import { Routes, Route } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import CategoryProducts from "./pages/CategoryProducts";
import Login from "./pages/Login";
import Register from "./pages/Register";
import FeedbackForm from "./pages/FeedbackForm.jsx";
import SupabaseContext from "./components/supabaseContext"; //объект по умолчанию
import { CartProvider } from "./components/cartContext.jsx"; //именованный объект
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import {ThemeProvider} from "./components/ThemeContext.jsx";
import "./styles/theme.css";


const supabaseUrl = "https://rjqeotzgekiauuqdpynm.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJqcWVvdHpnZWtpYXV1cWRweW5tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE4MzY2MDQsImV4cCI6MjA1NzQxMjYwNH0._LBS7fXP97u34xhsOwTW1uSkMRC3lCW8mrE-JLwmkLg";
const supabase = createClient(supabaseUrl, supabaseKey);

function App() {
    return (
        <ThemeProvider>
            <SupabaseContext.Provider value={supabase}>
                <CartProvider>
                    <div>
                        <Header />
                        <main>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/catalog" element={<Catalog />} />
                                <Route path="/category/:id" element={<CategoryProducts />} />
                                <Route path="/product/:id" element={<Product />} />
                                <Route path="/cart" element={<Cart />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/register" element={<Register />} />
                                <Route path="/FeedbackForm" element={<FeedbackForm />}/>
                                <Route path="*" element={<h1>404 - Вы попали не туда :(</h1>} />
                            </Routes>
                        </main>
                        <Footer />
                    </div>
                </CartProvider>
            </SupabaseContext.Provider>
        </ThemeProvider>
    );
}

export default App;