import React, { useState, useEffect } from "react";

import { ReactComponent as UpArrow } from "assets/icons/arrow.svg";

import Header from "components/Header/Header";

import styles from "./Layout.module.scss";

const Layout = ({ children }) => {
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleScroll = () => {
        const position = window.scrollY;
        setScrollPosition(position);
    };

    const scrollToTop = () => {
        window.scroll({ top: 0, behavior: "smooth" });
    };

    console.log("scrollPosition", scrollPosition > window.innerHeight);
    return (
        <div className={styles.layout}>
            <Header />
            <main className={styles.main}>{children}</main>
            {scrollPosition > window.innerHeight && (
                <div className={styles.toTop} onClick={scrollToTop}>
                    <UpArrow />
                </div>
            )}
        </div>
    );
};

export default Layout;
