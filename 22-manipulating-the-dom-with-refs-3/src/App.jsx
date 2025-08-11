import { useRef } from "react";

export default function CatFriends() {
  const firstRef = useRef(null);
  const secondRef = useRef(null);
  const thirdRef = useRef(null);

  function handleScrollToFirst() {
    firstRef.current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }

  function handleScrollToSecond() {
    secondRef.current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }

  function handleScrollToThird() {
    thirdRef.current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }

  return (
    <>
      <nav>
        <button onClick={handleScrollToFirst}>照片一</button>
        <button onClick={handleScrollToSecond}>照片二</button>
        <button onClick={handleScrollToThird}>照片三</button>
      </nav>
      <div>
        <ul>
          <li>
            <img src="https://picsum.photos/id/22/1400/600" ref={firstRef} />
          </li>
          <li>
            <img src="https://picsum.photos/id/237/1400/600" ref={secondRef} />
          </li>
          <li>
            <img src="https://picsum.photos/id/123/1400/600" ref={thirdRef} />
          </li>
        </ul>
      </div>
    </>
  );
}
