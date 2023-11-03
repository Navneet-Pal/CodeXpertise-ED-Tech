import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

function PrivateRoute({children}) {
    const {token} = useSelector((state) => state.auth);

    if(token !== null)
        return children
    else
        return <Link to="/login" />
}

export default PrivateRoute