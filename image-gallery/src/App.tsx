import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './App.css';
import ImageBox from './components/ImageBox';

function App() {
  const [images, setImages] = useState<string[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length) {
      acceptedFiles.forEach((file: File) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = (event) => {
          const imageUrl = event.target?.result as string;
          setImages((prev) => [...prev, imageUrl]);
        };
      });
    }
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

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

        <div className="plus-btn" {...getRootProps()}>
          <input {...getInputProps()} type="file" style={{ display: 'none' }} />
          +
        </div>
      </div>
    </div>
  );
}

export default App;
