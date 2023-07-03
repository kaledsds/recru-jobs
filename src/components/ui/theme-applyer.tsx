import Image from "next/image";

/**
 * Add a theme to the background of the page
 */
const ThemeApplyer = () => {
  return (
    <div className="absolute left-0 top-0 z-[-1] h-screen w-full">
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
