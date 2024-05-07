import React, { useRef, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { CommentItem } from "./components/CommentItem";

import "./MainPage.scss";
import { ConstantUtils } from "@/services/ConstantUtils";
import { Comments } from "@/models/Comments";


const MainPage: React.FC = () => {
  const elements = useLoaderData() as Comments[];

  const [start, setStart] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  const getTopHeight = () => {
    return ConstantUtils.BLOCK_HEIGHT * start;
  };

  const getBottomHeight = () => {
    return (
      ConstantUtils.BLOCK_HEIGHT *
      (elements.length - (start + ConstantUtils.VISIBLE_ELEMENTS + 1))
    );
  };

  const scrollHandler = async (event: React.UIEvent<HTMLElement>) => {
    setStart(
      Math.min(
        elements.length - ConstantUtils.VISIBLE_ELEMENTS - 1,
        Math.floor(event.currentTarget.scrollTop / ConstantUtils.BLOCK_HEIGHT)
      )
    );
  };

  return (
    <div
      className="main-page-container"
      ref={containerRef}
      onScroll={scrollHandler}
      style={{ height: ConstantUtils.BLOCK_HEIGHT * ConstantUtils.VISIBLE_ELEMENTS + 1, overflow: "auto" }}
    >
      <div style={{ height: getTopHeight() }} />
      {elements
        .slice(start, start + ConstantUtils.VISIBLE_ELEMENTS + 1)
        .map((element) => {
          return (
            <CommentItem height={ConstantUtils.BLOCK_HEIGHT} {...element} key={element.id} />
          );
        })}
      <div style={{ height: getBottomHeight() }} />
    </div>
  );
};

export default MainPage;
