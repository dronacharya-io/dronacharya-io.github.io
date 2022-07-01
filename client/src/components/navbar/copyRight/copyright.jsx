import React from "react";
import { MdOutlineCopyright } from "react-icons/md";

export default function CopyRight() {
  let date = new Date();
  let year = date.getFullYear();
  return (
    <div>
      <MdOutlineCopyright />
      <footer>{`${year}`}</footer>
    </div>
  );
}
