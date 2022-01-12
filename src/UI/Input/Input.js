// import PropTypes from "prop-types";
import React, { forwardRef } from "react";

import styles from "./Input.module.scss";

const Input = forwardRef(
    (
        { value, changed, readOnly, placeholder, autoFocus = false, name },
        ref
    ) => {
        return (
            <div className={styles.input_wrapper}>
                <input
                    className={styles.input}
                    value={value}
                    onChange={changed}
                    autoFocus={autoFocus}
                    ref={ref}
                    readOnly={readOnly}
                    placeholder={placeholder}
                    noValidate
                    name={name}
                    type="text"
                />
            </div>
        );
    }
);

// Input.propTypes = {
//     elementConfig: PropTypes.object,
//     value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//     changed: PropTypes.func,
//     invalid: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
//     validation: PropTypes.object,
//     touched: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
// };

export default Input;
