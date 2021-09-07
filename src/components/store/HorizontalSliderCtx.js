//www.digitalocean.com/community/tutorials/how-to-handle-dom-and-window-events-with-react

import { faRemoveFormat } from "@fortawesome/free-solid-svg-icons";
import { createContext, useRef, useContext, useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { VideoDetailContext } from "./VideoDetailCtx";
import { VideoSearchContext } from "./VideoSearchCtx";

const HorizontalSliderProvider = (props) => {
  const [pressed, setPressed] = useState(false);
  const [startx, setStartX] = useState(0);
  const [x, setX] = useState(0);
  const outerslider = useRef();
  const innerslider = useRef();
  //mouse styles
  const [grabbing, setGrabbing] = useState(false);

  const mouseDownSlider = (e, innerSliderRef) => {
    setPressed((prev) => true);
    let dis = e.nativeEvent.offsetX - innerSliderRef.current.offsetLeft;

    console.log(innerSliderRef.current.offsetLeft);
    console.log(e.nativeEvent.offsetX);
    console.log("dis-> " + dis);
    setStartX((prev) => dis);
    setGrabbing((prev) => true);
  };

  useEffect(() => {
    const handleWindowMouseUp = window.addEventListener("mouseup", () => {
      setPressed((prev) => false);
      console.log("QIQIQ- registered mouseup");
    });
    return () => window.removeEventListener("mouseup", handleWindowMouseUp);
  }, [setPressed]);

  const handleMouseMove = (e, innerSliderRef) => {
    if (!pressed) return;
    e.preventDefault();
    setX((prev) => e.nativeEvent.offsetX);
    innerSliderRef.current.style.left = `${e.nativeEvent.offsetX - startx}px`;
    checkboundary();
  };

  const checkboundary = () => {
    let outer = outerslider.current.getBoundingClientRect();
    let inner = innerslider.current.getBoundingClientRect();

    console.log("outer-" + outer);
    console.log("inner-" + inner);
    console.log("inner-style" + innerslider.current.style.left);

    if (parseInt(innerslider.current.style.left) > 0) {
      innerslider.current.style.left = "Opx";
    } else if (inner.right < outer.right) {
      innerslider.current.style.left = `-${inner.width - outer.width}px`;
    }
  };

  return (
    <HorizontalSliderContext.Provider
      value={{
        pressed,
        startx: startx,
        x: x,
        outerslider: outerslider,
        innerslider: innerslider,
        grabbing,
        mouseDownSlider: mouseDownSlider,
        handleMouseMove: handleMouseMove,
      }}
    >
      {props.children}
    </HorizontalSliderContext.Provider>
  );
};

export default HorizontalSliderProvider;

export const HorizontalSliderContext = createContext();
