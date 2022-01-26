import React from 'react';
import { HashSpinner, RingSpinner } from './SpinnersLoading';

const NotFound = ({ msg, color, size }) => {
    const [isLoading, setLoading] = React.useState(true);

    React.useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, ['']);


    if (isLoading){
        return (
            <>
                <HashSpinner color={color} size={size} />
            </>
        );
    }

    return (
        <>
            <RingSpinner color={color} size={size} />
            <h1
                style={{
                    textAlign: 'center',
                    marginTop: '2rem',
                    color: `${color}`
                }}
            >
                {msg}
            </h1>
        </>
    );
};

export default NotFound;
