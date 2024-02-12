import { Tag } from "antd";
import React from "react";

export default function CustomTag({ bool }) {
  return (
    <Tag color={bool ? "#68e3a4" : "#ed7168"} className="m-1">
      {bool ? "Oui" : "Non"}
    </Tag>
  );
}
