import React from "react";
import Layout from "../layout";
import { useParams } from "react-router-dom";

const Menu = () => {
    const { levelId } = useParams();
    const Level = sessionStorage.getItem("Level");
    return (
        <>
            <Layout>
                <h1>Menu Page {levelId +' '+ Level}</h1>
            </Layout>
        </>
    );
};

export default Menu;