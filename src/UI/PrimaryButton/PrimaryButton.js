import React from "react";

import styles from "./PrimaryButton.module.scss";

const PrimaryButton = ({
    disabled,
    clicked,
    children,
    style,
    className,
    type,
}) => {
    const btnStyle = [styles.button];

    if (className) {
        btnStyle.push(className);
    }

    return (
        <button
            disabled={disabled}
            className={btnStyle.join(" ")}
            onClick={clicked}
            style={style}
            type={type}
        >
            {children}
        </button>
    );
};

export default PrimaryButton;
