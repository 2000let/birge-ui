import React, { useRef, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { CommentItem } from "./components/CommentItem";
import { CommentsResponse, getComments } from "@/services/api/CommentsApi";

import "./MainPage.scss";
import { ConstantUtils } from "@/services/ConstantUtils";

const threshold = 3; // Define a threshold for when to fetch more data

const MainPage: React.FC = () => {
  const { elements, allElementsSize, currentOffset, currentLimit } = useLoaderData() as CommentsResponse;

  const [start, setStart] = useState(0);
  const [elementsState, setElementsState] = useState(elements);
  const [offset, setOffset] = useState(currentOffset);
  const [limit, setLimit] = useState(currentLimit);
  const [isFetching, setIsFetching] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const getTopHeight = () => {
    return ConstantUtils.BLOCK_HEIGHT * start;
  };

  const getBottomHeight = () => {
    return ConstantUtils.BLOCK_HEIGHT * (elementsState.length - (start + ConstantUtils.VISIBLE_ELEMENTS + 1));
  };

  const scrollHandler = async (event: React.UIEvent<HTMLElement>) => {
    setStart(
      Math.min(
        elementsState.length - ConstantUtils.VISIBLE_ELEMENTS - 1,
        Math.floor(event.currentTarget.scrollTop / ConstantUtils.BLOCK_HEIGHT)
      )
    );

    if (
      elementsState.length - start <= ConstantUtils.VISIBLE_ELEMENTS + threshold &&
      !isFetching &&
      elementsState.length < allElementsSize
    ) {
      setIsFetching(true);

      const newOffset = offset + limit;
      const newLimit = limit;
      const newElements = await getComments(newOffset, newLimit);
      setElementsState((prevElements) => [
        ...prevElements,
        ...newElements.elements,
      ]);
      setOffset(newOffset);
      setLimit(newLimit);

      setIsFetching(false);
    }
  };

  return (
    <div
      className="main-page-container"
      ref={containerRef}
      onScroll={scrollHandler}
      style={{ height: ConstantUtils.BLOCK_HEIGHT * ConstantUtils.VISIBLE_ELEMENTS + 1, overflow: "auto" }}
    >
      <div style={{ height: getTopHeight() }} />
      {elementsState
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
