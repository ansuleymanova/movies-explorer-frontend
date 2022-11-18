import { Outlet, Navigate } from 'react-router-dom';

export default function ProtectedRoute (props) {
    return props.isLoggedIn ? <Outlet /> : <Navigate to='/' />
}