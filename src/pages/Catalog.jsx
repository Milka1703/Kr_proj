import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SupabaseContext from '../components/supabaseContext.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

function Catalog() {
    const supabase = useContext(SupabaseContext);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCategories() {
            try {
                const { data, error } = await supabase
                    .from('categories')
                    .select('*');

                if (error) {
                    console.error('Ошибка при получении категорий:', error);
                } else {
                    setCategories(data);
                }
            } catch (err) {
                console.error('Произошла ошибка:', err);
            } finally {
                setLoading(false);
            }
        }

        fetchCategories().catch((error) => {
            console.error('Необработанная ошибка при загрузке категорий:', error);
        });
    }, [supabase]);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Загрузка...</span>
                </div>
            </div>
        );
    }

    if (!categories || categories.length === 0) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <h1 className="text-center text-secondary">Категории не найдены</h1>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4 text-primary">Каталог</h1>
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {categories.map((category) => (
                    <div key={category.id} className="col">
                        <div className="card h-100 shadow-sm">
                            <div className="card-body d-flex flex-column align-items-center justify-content-center">
                                <h5 className="card-title text-center mb-4">{category.name}</h5>
                                <Link
                                    to={`/category/${category.id}`}
                                    className="btn btn-primary btn-lg mt-auto"
                                >
                                    Перейти
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Catalog;