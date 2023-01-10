import React from "react";

import Style from "./Toggle.module.css";

const Toggle = ({ label }) => {
  return (
    <div className={Style.Toggle}>
      <div className={Style.ToggleSwitchBox}>
        <input
          type="checkbox"
          className={Style.ToggleCheckbox}
          name={label}
          id={label}
        />
        <label className={Style.ToggleLabel} htmlFor={label}>
          <span className={Style.ToggleInner} />
          <span className={Style.ToggleSwitch} />
        </label>
      </div>
    </div>
  );
};

export default Toggle;
