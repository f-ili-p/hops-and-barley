import React from "react";

import Header from "components/Header/Header";

import styles from "./Layout.module.scss";

const Layout = ({ children }) => {
    return (
        <div className={styles.layout}>
            <Header />
            <main className={styles.main}>{children}</main>
        </div>
    );
};

export default Layout;
