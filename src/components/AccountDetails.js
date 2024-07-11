import { selectTheme, toggleTheme } from "@/slices/globalSettingsSlice";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const { default: MessageAvatar } = require("./MessageAvatar");

const AccountDetails = ({ email, avatar, onLogout }) => {
  const image_src = avatar ? avatar : "/images/avatar.png";
  const theme = useSelector(selectTheme);
  const theme_icon = useRef(theme === "dark" ? "sun" : "moon");
  const dispatch = useDispatch();

  useEffect(() => {
    if (theme === "dark") {
      theme_icon.current = "moon";
    } else {
      theme_icon.current = "sun";
    }
  }, [theme]);

  return (
    <div className="account-details justify-between list-padding">
      <div className="flex items-center gap-3">
        <MessageAvatar image_src={image_src} />

        <p className={theme}>{email}</p>
      </div>

      <div className="flex items-center gap-3">
        <button
          className={`nice-button${theme}`}
          onClick={() => dispatch(toggleTheme())}
        >
          <svg className={`icon-md send-icon ${theme}`}>
            <use href={`images/icons.svg#${theme_icon.current}-icon`} />
          </svg>
        </button>
        <button className={`nice-button${theme}`} onClick={onLogout}>
          <svg className={`icon-md send-icon ${theme}`}>
            <use href="images/icons.svg#logout-icon" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AccountDetails;
