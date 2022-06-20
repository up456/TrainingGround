import React from 'react';

const ImageBox = ({
  image,
  deleteImage,
}: {
  image: string;
  deleteImage: (targetImage: string) => void;
}) => {
  return (
    <div className="iamge-box" style={{ backgroundImage: `url(${image})` }}>
      <img className="image" src={image} alt="사진" />
      <button className="minus-btn" onClick={() => deleteImage(image)}>
        -
      </button>
    </div>
  );
};

export default ImageBox;
