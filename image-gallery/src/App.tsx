import React, { useRef, useState } from 'react';
import './App.css';
import ImageBox from './components/ImageBox';

function App() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<string[]>([]);

  const onClickBtn = () => {
    fileInputRef.current?.click();
  };

  const onChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = (event) => {
        const imageUrl = event.target?.result as string;
        setImages((prev) => [...prev, imageUrl]);
      };
    }
  };

  const deleteImage = (targetImage: string) => {
    setImages((prev) => {
      const newImages = [...prev].filter((image) => image !== targetImage);
      return newImages;
    });
  };

  return (
    <div className={'content-container'}>
      <div className={images.length === 0 ? 'content-box' : 'content-box row'}>
        {images.length === 0 ? (
          <div className="text-box">
            {`이미지가 없습니다.`}
            <br />
            {'이미지를 추가하세요.'}
          </div>
        ) : (
          <div className="image-container">
            {images.map((image, idx) => (
              <ImageBox key={idx} image={image} deleteImage={deleteImage} />
            ))}
          </div>
        )}
        <input
          onChange={onChangeFile}
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
        />
        <button className="plus-btn" onClick={onClickBtn}>
          +
        </button>
      </div>
    </div>
  );
}

export default App;
