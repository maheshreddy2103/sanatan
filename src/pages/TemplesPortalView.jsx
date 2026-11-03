import React from 'react';
import TemplesMapPortal from '../components/TemplesMapPortal';

export default function TemplesPortalView({ onNavigate }) {
  return (
    <div className="temples-portal-page-wrapper">
      <TemplesMapPortal onNavigate={onNavigate} />
    </div>
  );
}

