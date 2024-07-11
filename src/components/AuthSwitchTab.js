const { default: MessageAvatar } = require("./MessageAvatar");

const AccountDetails = ({ email, avatar, onLogout }) => {
  const image_src = avatar ? avatar : "/images/avatar.png";
  return (
    <div className="account-details justify-between list-padding">
      <div className="flex items-center gap-3">
        <MessageAvatar image_src={image_src} />

        <p>{email}</p>
      </div>

      <button className="nice-button" onClick={onLogout}>
        <svg className="icon-md send-icon">
          <use href="images/icons.svg#logout-icon" />
        </svg>
      </button>
    </div>
  );
};

export default AccountDetails;
