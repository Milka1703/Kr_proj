import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SupabaseContext from '../components/supabaseContext.jsx';
import { CartContext } from '../components/cartContext.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

function Product() {
    const { id } = useParams();
    const supabase = useContext(SupabaseContext);
    const { addToCart } = useContext(CartContext);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchProduct() {
            try {
                const { data, error } = await supabase
                    .from('products')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (error) {
                    console.error('Ошибка при получении продукта:', error);
                    navigate('/error');
                } else {
                    setProduct(data);
                }
            } catch (err) {
                console.error('Произошла ошибка:', err);
                navigate('/error');
            } finally {
                setLoading(false);
            }
        }

        fetchProduct().catch((error) => {
            console.error('Необработанная ошибка при загрузке продукта:', error);
            navigate('/error');
        });
    }, [id, supabase, navigate]);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Загрузка...</span>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <h1 className="text-center text-secondary">Продукт не найден</h1>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <div className="card shadow-sm mb-5">
                <div className="card-body">
                    <h2 className="card-title text-center mb-4 text-primary">{product.name}</h2>
                    <p className="card-text text-muted">{product.description}</p>
                    <p className="card-text fw-bold text-center mb-4">Цена: {product.price} ₽</p>
                    <div className="d-flex justify-content-center">
                        <button
                            onClick={() => addToCart(product)}
                            className="btn btn-primary btn-lg me-2"
                        >
                            Добавить в корзину
                        </button>
                        <button
                            onClick={() => navigate(-1)}
                            className="btn btn-outline-secondary btn-lg"
                        >
                            Назад
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Product;