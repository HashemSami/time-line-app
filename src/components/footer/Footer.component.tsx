import { FC, useRef, useEffect, useState } from "react";

import { FooterContainer, WellsScrollContainer } from "./Footer.styles";

const Footer: FC = () => {
  const scrollDiv = useRef<HTMLDivElement | null>(null);
  const requestRef = useRef<any>();

  const wellsScroll = Array.from({ length: 20 }, (_, i) => {
    const colors = ["yellow", "#1ec71e", "red", "pink", "grey"];
    const randomColor = Math.floor(Math.random() * 5);
    return (
      <p style={{ backgroundColor: colors[randomColor] }}>HRDH_2232_{i}</p>
    );
  });

  const [wells, setWells] = useState<JSX.Element[]>(wellsScroll);

  const scrollElement = () => {
    if (!scrollDiv.current) {
      return;
    }

    const element = scrollDiv.current;

    const max_scroll = element.scrollWidth - element.clientWidth;

    const current_scroll = element.scrollLeft;

    if (current_scroll >= max_scroll - 10) {
      setWells((prev) => {
        return [...prev, ...prev];
      });
    }
    scrollDiv.current.scrollTo({
      // top: 100,
      left: current_scroll + 200,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    requestRef.current = setInterval(scrollElement, 3000);
    return () => {
      console.log("interval cleared");
      return clearInterval(requestRef.current);
    };
  }, []);
  return (
    <FooterContainer>
      <WellsScrollContainer data-current="0" ref={scrollDiv}>
        {wells.map((well) => well)}
      </WellsScrollContainer>
    </FooterContainer>
  );
};

export default Footer;
