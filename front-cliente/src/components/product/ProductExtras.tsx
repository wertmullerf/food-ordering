import React from 'react';

interface Extra {
  _id: string;
  nombre: string;
  precioExtra: number;
}

interface ProductExtrasProps {
  extras: Extra[];
  onExtraChange: (extraId: string, precio: number) => void;
}

export const ProductExtras: React.FC<ProductExtrasProps> = ({ extras, onExtraChange }) => (
  <div className="mb-4">
    <h5 className="text-white mb-3">Personaliza tu pedido</h5>
    <div className="extras-grid">
      {extras.map((extra) => (
        <div
          key={extra._id}
          className="p-3 mb-2 rounded-3 d-flex justify-content-between align-items-center"
          style={{ 
            backgroundColor: 'var(--dark-surface-2)',
            transition: 'transform 0.2s ease'
          }}
          onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id={`extra-${extra._id}`}
              onChange={() => onExtraChange(extra._id, extra.precioExtra ?? 0)}
            />
            <label className="form-check-label text-white" htmlFor={`extra-${extra._id}`}>
              {extra.nombre}
            </label>
          </div>
          <span style={{ color: 'var(--accent-color)' }}>
            +${extra.precioExtra}
          </span>
        </div>
      ))}
    </div>
  </div>
); 