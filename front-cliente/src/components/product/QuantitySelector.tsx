import React from 'react';

interface QuantitySelectorProps {
  cantidad: number;
  onDecrease: () => void;
  onIncrease: () => void;
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  cantidad,
  onDecrease,
  onIncrease
}) => (
  <div className="d-flex align-items-center gap-3">
    <button
      className="btn p-2 rounded-circle"
      style={{ 
        backgroundColor: 'var(--dark-surface-2)',
        color: 'var(--text-primary)',
        width: '40px',
        height: '40px'
      }}
      onClick={onDecrease}
    >
      <i className="bi bi-dash"></i>
    </button>
    <span className="fs-4 fw-bold text-white">{cantidad}</span>
    <button
      className="btn p-2 rounded-circle"
      style={{ 
        backgroundColor: 'var(--dark-surface-2)',
        color: 'var(--text-primary)',
        width: '40px',
        height: '40px'
      }}
      onClick={onIncrease}
    >
      <i className="bi bi-plus"></i>
    </button>
  </div>
); 