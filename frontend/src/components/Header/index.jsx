import { Avatar, Badge, Input } from "antd";
import { FiBell, FiMessageCircle, FiSearch } from "react-icons/fi";
import "./styles.scss";

export default function Header({
  user = { name: "Thao Ly", role: "User", avatarUrl: null },
  notificationsCount = 2,
  messagesCount = 3,
}) {
  return (
    <header className="app-header full-bleed">
      <div className="app-header__inner">
        <a className="app-header__logo" href="/">
          LOGO
        </a>

        <div className="app-header__search">
          <Input
            placeholder="Tìm kiếm chiến dịch...."
            allowClear
            suffix={<FiSearch size={18} />}
          />
        </div>

        <nav className="app-header__nav" aria-label="Điều hướng">
          <a className="app-header__navLink app-header__navLink--active" href="/">
            Trang chủ
          </a>
          <a className="app-header__navLink" href="#">
            Bản đồ chiến dịch
          </a>
          <a className="app-header__navLink" href="#">
            Hỗ trợ
          </a>
        </nav>

        <div className="app-header__actions">
          <button type="button" className="app-header__iconBtn" aria-label="Thông báo">
            <Badge count={notificationsCount} size="small" offset={[0, 4]}>
              <FiBell size={22} />
            </Badge>
          </button>
          <button type="button" className="app-header__iconBtn" aria-label="Tin nhắn">
            <Badge count={messagesCount} size="small" offset={[0, 4]}>
              <FiMessageCircle size={22} />
            </Badge>
          </button>

          <div className="app-header__user">
            <Avatar size={34} src={user.avatarUrl}>
              {user.name?.[0]?.toUpperCase?.() ?? "U"}
            </Avatar>
            <div className="app-header__userText">
              <div className="app-header__userName">{user.name}</div>
              <div className="app-header__userRole">{user.role}</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

