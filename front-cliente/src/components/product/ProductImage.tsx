import React from 'react';

interface ProductImageProps {
  imageUrl: string;
  nombre: string;
}

export const ProductImage: React.FC<ProductImageProps> = ({ imageUrl, nombre }) => (
  <div className="position-sticky" style={{ top: '2rem' }}>
    <div 
      className="rounded-4 overflow-hidden"
      style={{ 
        backgroundColor: 'var(--dark-surface)',
        boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
      }}
    >
      <img
        src={imageUrl}
        className="w-100"
        style={{ 
          height: '400px',
          objectFit: 'cover'
        }}
        alt={nombre}
      />
    </div>
  </div>
); 