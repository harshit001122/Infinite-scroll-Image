import React, { useState, useEffect, useCallback } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

const Gallery: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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

  const openModal = (src: string) => {
    setSelectedImage(src);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedImage(null);
  };

  return (
    <>
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
        <Masonry>
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt=""
              style={{ width: '100%', display: 'block', cursor: 'pointer' }}
              onClick={() => openModal(src)}
            />
          ))}
        </Masonry>
      </ResponsiveMasonry>

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={{ content: { display: 'flex', justifyContent: 'center', alignItems: 'center' } }}>
        {selectedImage && <img src={selectedImage} alt="" style={{ maxWidth: '90%', maxHeight: '90%' }} />}
      </Modal>
    </>
  );
};

export default Gallery;
