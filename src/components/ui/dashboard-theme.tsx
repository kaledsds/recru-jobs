import Image from "next/image";
import React from "react";

const DashboardTheme = () => {
  return (
    <div className="absolute left-0 top-0 z-[-1] h-screen w-full">
      <Image
        className="absolute bottom-0 right-0 z-10 h-screen"
        src="/svgs/shape-4.svg"
        alt="shape-2"
        width={1000}
        height={959}
      />
      <Image
        className="absolute left-0 top-0 z-10 h-screen"
        src="/svgs/shape-3.svg"
        alt="shape-2"
        width={1000}
        height={546}
      />
    </div>
  );
};

export default DashboardTheme;
