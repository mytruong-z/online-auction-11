import {FaSearch} from "react-icons/fa";
import React from "react";

function Header({title, hideSearch = false}) {
    return (
        <div id="admin-banner">
            <div className="admin-banner p-2 pl-2 mt-4 mb-2 rounded-3 bold text-white bg-dark text-uppercase">
                {title}
            </div>
            { !hideSearch &&
            <div className="admin-header rounded bg-light p-2">
                <div className="input-group search-field w-25">
                    <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search"
                           aria-describedby="search-addon"/>
                    <span className="input-group-text border-0" id="search-addon"><FaSearch/></span>
                </div>
            </div>
            }
        </div>
    );
}

export default Header;