import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import SupabaseContext from '../components/supabaseContext';

function Register() {
    const supabase = useContext(SupabaseContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
            });

            if (error) {
                setError('Ошибка при регистрации. Попробуйте снова.');
            } else {
                console.log('Успешная регистрация:', data);
                navigate('/login');
            }
        } catch (err) {
            console.error('Ошибка при регистрации:', err);
            setError('Произошла ошибка. Попробуйте снова.');
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow-lg p-4 rounded-3" style={{ width: '100%', maxWidth: '400px', background: '#ffe5cc', border: 'none' }}>
                <h2 className="text-center mb-4 text-dark">Регистрация</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleRegister}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label text-dark">
                            Email
                        </label>
                        <input
                            type="email"
                            className="form-control border-0 rounded-2"
                            id="email"
                            placeholder="Введите email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label text-dark">
                            Пароль
                        </label>
                        <input
                            type="password"
                            className="form-control border-0 rounded-2"
                            id="password"
                            placeholder="Введите пароль"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-outline-dark w-100 rounded-2">
                        Зарегистрироваться
                    </button>
                </form>
                <p className="mt-3 text-center text-muted">
                    Уже есть аккаунт?{' '}
                    <button
                        onClick={() => navigate('/login')}
                        className="btn btn-link p-0 text-decoration-none"
                        style={{ color: '#ff9966' }}
                    >
                        Войти
                    </button>
                </p>
            </div>
        </div>
    );
}

export default Register;