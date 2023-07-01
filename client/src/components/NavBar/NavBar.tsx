import { Link } from "react-router-dom";
import Filters from "../Filters/Filters";
import SearchBar from "../SearchBar/SearchBar";
import style from "./NavBar.module.css";
import React from "react";

const NavBar: React.FC = () => {
    return (
        <header>
            <Filters/>
            <SearchBar/>

            
                <Link to={"/form"}>
                    <button className={style.Button}>Add your Dog</button>
                </Link>
            
        </header>
    );
}

export default NavBar;
