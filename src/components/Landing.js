import React from "react";
import {Link} from "react-router-dom";

function Landing() {
    return (
        <div>
            <div>
                <Link to="/register">
                    Sign Up
                </Link>
            </div>
            <div>
                <Link to="/login">
                    Login
                </Link>
            </div>
        </div>
    );
}

export default Landing;