import React from 'react';
import { Link } from '@inertiajs/react';

export default function AppLayout({ children }) {
    return (
        <div id="app-layout">
            <nav className="navbar navbar-default">
                <div className="container">
                    <div className="navbar-header">
                        <Link className="navbar-brand" href="/">
                            Task List 666
                        </Link>
                    </div>
                </div>
            </nav>

            {children}
        </div>
    );
}