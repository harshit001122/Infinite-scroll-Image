import React, { useState, useEffect, useCallback } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

const Gallery: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const [page, setPage] = useState(1);

  const fetchImages = useCallback(async () => {
    const res = await fetch(
      `https://api.unsplash.com/photos/?client_id=${accessKey}&page=${page}&per_page=25`
    );
    const data = await res.json();
    const urls = data.map((image: any) => image.urls.small);
    setImages((prevImages) => [...prevImages, ...urls]);
  }, [page]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const handleScroll = useCallback(() => {
    if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
      setPage((prevPage) => prevPage + 1);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
      <Masonry>
        {images.map((src, index) => (
          <img key={index} src={src} alt="" style={{ width: '100%', display: 'block' }} />
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
};

export default Gallery;
