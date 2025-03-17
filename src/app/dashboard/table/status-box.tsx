/*
|-----------------------------------------
| setting up status-box for the app
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: DaaUK, September, 2023
|-----------------------------------------
*/

import { BsCheck2, BsExclamationCircle } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";

const statusStyle =
  "flex items-center justify-start gap-2 w-content py-[2px] text-[.85rem] px-3 rounded-lg cursor-pointer w-[fit-content]";

export const StatusBox = ({
  text = "not found",
  className = "",
}: {
  className?: string;
  text: string;
}) => {
  const convertText = text.toLocaleLowerCase();
  let result = (
    <div className={`${statusStyle} ${className} bg-red-200 text-red-950`}>
      {text} <BsExclamationCircle />
    </div>
  );
  if (convertText === "paid") {
    result = (
      <div
        className={`${statusStyle} ${className} bg-green-200 text-green-950`}
      >
        {text} <BsCheck2 />
      </div>
    );
  } else if (convertText === "cancelled") {
    result = (
      <div
        className={`${statusStyle} ${className} bg-slate-200 text-slate-800`}
      >
        {text} <RxCross2 />
      </div>
    );
  } else if (convertText === "pending") {
    result = (
      <div className={`${statusStyle} ${className} bg-red-200 text-red-950`}>
        {text} <BsExclamationCircle />
      </div>
    );
  } else if (convertText === "failed") {
    result = (
      <div className={`${statusStyle} ${className} bg-red-300 text-red-600`}>
        {text} <BsExclamationCircle />
      </div>
    );
  } else if (convertText === "order fulfilled") {
    result = (
      <div
        className={`${statusStyle} ${className} bg-green-200 text-green-950`}
      >
        {text} <BsCheck2 />
      </div>
    );
  } else if (convertText === "fulfilled") {
    result = (
      <div
        className={`${statusStyle} ${className} bg-green-200 text-green-950`}
      >
        {text} <BsCheck2 />
      </div>
    );
  } else if (convertText === "shipped") {
    result = (
      <div
        className={`${statusStyle} ${className} bg-green-200 text-green-950`}
      >
        {text} <BsCheck2 />
      </div>
    );
  } else if (convertText === "approved") {
    result = (
      <div
        className={`${statusStyle} ${className} bg-green-200 text-green-950`}
      >
        {text} <BsCheck2 />
      </div>
    );
  } else if (convertText === "ready to pickup") {
    result = (
      <div className={`${statusStyle} ${className} bg-blue-200 text-blue-500`}>
        {text} <BsExclamationCircle />
      </div>
    );
  } else if (convertText === "partial fulfilled") {
    result = (
      <div className={`${statusStyle} ${className} bg-red-200 text-red-950`}>
        {text} <BsExclamationCircle />
      </div>
    );
  } else if (convertText === "partially fulfilled") {
    result = (
      <div className={`${statusStyle} ${className} bg-red-200 text-red-950`}>
        {text} <BsExclamationCircle />
      </div>
    );
  } else if (convertText === "order cancelled") {
    result = (
      <div
        className={`${statusStyle} ${className} bg-slate-200 text-slate-800`}
      >
        {text} <RxCross2 />
      </div>
    );
  } else if (convertText === "delivery delayed") {
    result = (
      <div className={`${statusStyle} ${className} bg-red-300 text-red-700`}>
        {text} <BsExclamationCircle />
      </div>
    );
  }
  return result;
};
StatusBox.defaultProps = {
  className: "",
};
