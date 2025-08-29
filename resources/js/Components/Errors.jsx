import React from 'react';

export default function Errors({ errors }) {
    if (!errors || Object.keys(errors).length === 0) {
        return null;
    }

    const allErrors = Object.values(errors).flat();

    return (
        <div className="alert alert-danger">
            <strong>Whoops! Something went wrong!</strong>
            <br /><br />
            <ul>
                {allErrors.map((error, index) => (
                    <li key={index}>{error}</li>
                ))}
            </ul>
        </div>
    );
}