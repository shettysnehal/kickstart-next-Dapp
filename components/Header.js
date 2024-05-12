import React from "react";
import { MenuMenu, MenuItem, Menu } from "semantic-ui-react";
import { Link } from "../routes";
export default function Header() {
  return (
    <Menu
      style={{
        marginTop: "10px",
      }}
    >
      <Link route="/">
        <a className="item">Crowd Coin</a>
      </Link>

      <MenuMenu position="right">
        <Link route="/">
          <a className="item">Campaigns</a>
        </Link>
        <Link route="/campaigns/new">
          <a className="item">+</a>
        </Link>
      </MenuMenu>
    </Menu>
  );
}
