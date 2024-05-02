import React, { useEffect, useState } from "react";
import "./ImageSlider.css";

interface ImageSliderProps {
  url: string;
  limit?: string;
  page?: string;
}

interface ImageItem {
  id: string;
  download_url: string;
}

const ImageSlider: React.FC<ImageSliderProps> = ({
  url,
  limit = "5",
  page = "1",
}) => {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function fetchImages(getUrl: string) {
    try {
      setLoading(true);
      const response = await fetch(`${getUrl}?page=${page}&limit=${limit}`);
      const data = await response.json();
      if (data) {
        setImages(data);
        setLoading(false);
      }
    } catch (e) {
      if (e instanceof Error) {
        setErrorMsg(e.message);
      } else {
        setErrorMsg("An error occurred while fetching images.");
      }
      setLoading(false);
    }
  }
  useEffect(() => {
    if (url !== "") fetchImages(url);
  }, [url]);

  function handlePrevious() {
    setCurrentSlide(currentSlide === 0 ? images.length - 1 : currentSlide - 1);
  }
  function handleNext() {
    setCurrentSlide(currentSlide === images.length - 1 ? 0 : currentSlide + 1);
  }

  if (loading) {
    return <div>Loading data ! Please wait</div>;
  }

  if (errorMsg !== null) {
    return <div>Error occured ! {errorMsg}</div>;
  }
  return (
    <div>
      {/* Display images, currentSlide, errorMsg, loading state */}
      {loading && <p>Loading...</p>}
      {errorMsg && <p>Error: {errorMsg}</p>}
      {images && images.length ? (
        <div className="image-component">
          <div className="prev-btn-component">
            <button onClick={handlePrevious}>{"Previous"}</button>
          </div>
          <div>
            {images.map((imageItem, index) => (
              <img
                key={imageItem.id}
                alt={imageItem.download_url}
                src={imageItem.download_url}
                className={
                  currentSlide === index
                    ? "current-image"
                    : "current-image hide-current-image"
                }
              />
            ))}
          </div>
          <div className="next-btn-componentn">
            <button onClick={handleNext}>{"Next"}</button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ImageSlider;
