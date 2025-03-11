import React from 'react';
import { MapContainer, TileLayer, Popup } from 'react-leaflet';
import CustomMarker from './CustomMarker';
import MarkerPopup from './MarkerPopup';

const MapComponent = ({ species, selectedSpecies, onSpeciesSelect }) => {
  // Coordenadas aproximadas do centro do Brasil (próximo a Brasília)
  const brasilCenter = [-15.77972, -47.92972];
  const initialZoom = 4; // Zoom adequado para mostrar todo o Brasil

  return (
    <MapContainer
      center={brasilCenter}
      zoom={initialZoom}
      className="h-[500px] w-full"
      zoomControl={false}
      style={{ background: '#e5f2f9' }}
      minZoom={3} // Evita zoom out excessivo
      maxBounds={[
        [-35.0, -75.0], // Canto sudoeste
        [5.0, -30.0]    // Canto nordeste
      ]} // Limita o pan para manter o foco no Brasil
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      
      {species.map((specie) => (
        <CustomMarker
          key={specie.id}
          position={[specie.location.lat, specie.location.lng]}
          selected={selectedSpecies?.id === specie.id}
          onClick={() => onSpeciesSelect(specie)}
        >
          <Popup>
            <MarkerPopup species={specie} />
          </Popup>
        </CustomMarker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;