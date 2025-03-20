import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import SupabaseContext from '../components/supabaseContext.jsx';
import { CartContext } from "../components/cartContext.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';

function CategoryProducts() {
    const { id } = useParams();
    const supabase = useContext(SupabaseContext);
    const { addToCart } = useContext(CartContext);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const { data, error } = await supabase
                    .from('products')
                    .select('*')
                    .eq('category_id', id);

                if (error) {
                    console.error('Ошибка при получении товаров:', error);
                } else {
                    setProducts(data);
                }
            } catch (err) {
                console.error('Произошла ошибка:', err);
            } finally {
                setLoading(false);
            }
        }

        fetchProducts().catch((error) => {
            console.error('Необработанная ошибка при загрузке товаров:', error);
        });
    }, [id, supabase]);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Загрузка...</span>
                </div>
            </div>
        );
    }

    if (!products || products.length === 0) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <h1 className="text-center text-secondary">Товары не найдены</h1>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4 text-primary">Товары категории</h1>
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {products.map((product) => (
                    <div key={product.id} className="col">
                        <Link to={`/product/${product.id}`} className="text-decoration-none">
                            <div className="card h-100 shadow-sm">
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title text-center">{product.name}</h5>
                                    <p className="card-text text-muted">{product.description}</p>
                                    <p className="card-text fw-bold text-center">Цена: {product.price} ₽</p>
                                    <div className="mt-auto text-center">
                                        <button
                                            onClick={() => addToCart(product)}
                                            className="btn btn-success btn-lg w-75"
                                        >
                                            Добавить в корзину
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CategoryProducts;