import Image from "next/image";

/**
 * Add a theme to the background of the page
 */
const ThemeApplyer = () => {
  return (
    <div className="absolute left-0 top-0 z-[-1] h-screen w-full">
      {/* <svg
        width="1440"
        height="969"
        viewBox="0 0 1440 969"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <mask
          id="mask0_95:1005"
          style={{ maskType: "alpha" }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="1440"
          height="969"
        >
          <rect width="1440" height="969" fill="#090E34" />
        </mask>
        <g mask="url(#mask0_95:1005)">
          <path
            opacity="0.1"
            d="M1086.96 297.978L632.959 554.978L935.625 535.926L1086.96 297.978Z"
            fill="url(#paint0_linear_95:1005)"
          />
          <path
            opacity="0.1"
            d="M1324.5 755.5L1450 687V886.5L1324.5 967.5L-10 288L1324.5 755.5Z"
            fill="url(#paint1_linear_95:1005)"
          />
        </g>
        <defs>
          <linearGradient
            id="paint0_linear_95:1005"
            x1="1178.4"
            y1="151.853"
            x2="780.959"
            y2="453.581"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#4A6CF7" />
            <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_95:1005"
            x1="160.5"
            y1="220"
            x2="1099.45"
            y2="1192.04"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#4A6CF7" />
            <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg> */}
      <Image
        className="lef-0 absolute top-0 z-10 h-screen"
        src="/svgs/shape-6.svg"
        alt="shape-2"
        width={2000}
        height={959}
      />
      <Image
        className="absolute right-0 top-0 z-10 h-screen"
        src="/svgs/shape-7.svg"
        alt="shape-2"
        width={1500}
        height={546}
      />
    </div>
  );
};

export default ThemeApplyer;