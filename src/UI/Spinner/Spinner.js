import React from "react";

import styles from "./Spinner.module.scss";

const Spinner = () => {
    return (
        <div className={styles.glass_wrapper}>
            <div className={styles.glass}>
                <div className={styles.beer}></div>
            </div>
        </div>
    );
};

export default Spinner;
