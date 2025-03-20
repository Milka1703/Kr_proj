import React, { useState } from 'react';
import ReactDOM from 'react-dom';


const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};


const formStyle = {
    backgroundColor: '#ffe5cc',
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '400px',
    width: '100%',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
};


const FeedbackForm = ({ onClose }) => {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');х

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Отправлено:', { name, message });
        alert(`Спасибо, ${name}! Ваше сообщение отправлено.`);
        onClose();
    };

    return (
        <div className="feedback-form-overlay" style={overlayStyle}>
            <div className="feedback-form" style={formStyle}>
                <h2 className="text-center mb-4 text-dark">Форма обратной связи</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label text-dark">
                            Имя
                        </label>
                        <input
                            type="text"
                            id="name"
                            className="form-control border-0 rounded-2"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="message" className="form-label text-dark">
                            Сообщение
                        </label>
                        <textarea
                            id="message"
                            className="form-control border-0 rounded-2"
                            rows="4"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                        />
                    </div>
                    <div className="d-flex justify-content-end">
                        <button
                            type="submit"
                            className="btn btn-outline-dark me-2 rounded-2"
                        >
                            Отправить
                        </button>
                        <button
                            type="button"
                            className="btn btn-outline-dark rounded-2"
                            onClick={onClose}
                        >
                            Закрыть
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const FeedbackFormPortal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const portalRoot = document.getElementById('portal');
    return ReactDOM.createPortal(
        <FeedbackForm onClose={onClose} />,
        portalRoot
    );
};

const App = () => {
    const [isFormOpen, setIsFormOpen] = useState(false);

    const openForm = () => setIsFormOpen(true);
    const closeForm = () => setIsFormOpen(false);

    return (
        <div className="app">
            <h1 className="text-center mb-4">Добро пожаловать!</h1>
            <div className="d-flex justify-content-center">
                <button
                    className="btn btn-secondary"
                    onClick={openForm}
                >
                    Открыть форму обратной связи
                </button>
            </div>
            <FeedbackFormPortal
                isOpen={isFormOpen}
                onClose={closeForm}
            />
        </div>
    );
};

export default App;