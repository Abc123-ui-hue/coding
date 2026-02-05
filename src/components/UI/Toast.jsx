import React from 'react';
import { useShop } from '../../context/ShopContext';
import './Toast.css';

const Toast = () => {
    const { toast } = useShop();

    if (!toast) return null;

    return (
        <div className={`toast toast-${toast.type}`}>
            {toast.message}
        </div>
    );
};

export default Toast;
