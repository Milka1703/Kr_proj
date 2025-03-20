import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ThemeContext } from "../components/ThemeContext"; // Импортируем контекст

function Home() {
    // Получаем текущую тему и функцию переключения из контекста
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <div className="d-flex flex-column align-items-center justify-content-center vh-100">
            <div className="text-center">
                <h1 className="display-4 text-primary">Добро пожаловать в Pet Shop!</h1>
                <p className="lead text-secondary">Здесь Вы найдете Всё лучшее для Ваших питомцев!</p>
                <div className="mt-4 d-flex gap-3">
                    <button className="btn btn-primary btn-lg">Перейти в магазин</button>
                    <button
                        className={`btn btn-${theme === "light" ? "dark" : "light"} btn-lg`}
                        onClick={toggleTheme}
                    >
                        Переключить на {theme === "light" ? "темную" : "светлую"} тему
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Home;