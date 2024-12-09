import * as React from "react";

function SvgStar(props) {
  return (
    <svg
      width="800px"
      height="800px"
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit={2}
      {...props}
    >
      <path fill="none" d="M-512 -192H768V608H-512z" />
      <path d="M32.001 9.188l5.666 17.438h18.335L41.169 37.403l5.666 17.438-14.834-10.777-14.833 10.777 5.666-17.438L8 26.626h18.335l5.666-17.438z" />
    </svg>
  );
}

export default SvgStar;
