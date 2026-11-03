import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Html, Float } from '@react-three/drei';
import * as THREE from 'three';
import { 
  TOTAL_MAPPED_TEMPLES, 
  STATE_TEMPLE_STATS, 
  STATE_BY_ID 
} from '../data/templesPortalData';
import { getTempleCoordinates } from '../data/templeCoordinates';
import indiaStatesGeo from '../data/indiaStatesGeo.json';

// Geographic center of India for 3D coordinate normalization
const CENTER_LNG = 82.5;
const CENTER_LAT = 22.5;
const SCALE = 0.95;

// Convert [lng, lat] to 3D [x, z]
export function geoTo3D(lng, lat) {
  const x = (lng - CENTER_LNG) * SCALE;
  const z = -(lat - CENTER_LAT) * SCALE;
  return [x, z];
}

// Sacred Traditional Sanatan Temple Colors
// Inspired by Consecrated Panchaloha Gold, Auspicious Kesariya Saffron, and Sacred Chandan
const TIER_3D_CONFIG = {
  5: {
    color: '#F59E0B',      // Auspicious Temple Gold (Suvarna)
    emissive: '#B45309',
    height: 2.2,
    edgeColor: '#FEF08A'
  },
  4: {
    color: '#EA580C',      // Sacred Kesariya Saffron (Bhagwa)
    emissive: '#9A3412',
    height: 1.6,
    edgeColor: '#FDBA74'
  },
  3: {
    color: '#D97706',      // Auspicious Haldi / Turmeric Ochre
    emissive: '#78350F',
    height: 1.1,
    edgeColor: '#FDE68A'
  },
  2: {
    color: '#B45309',      // Sacred Sandalwood / Chandan Amber
    emissive: '#451A03',
    height: 0.75,
    edgeColor: '#FBBF24'
  },
  1: {
    color: '#854D0E',      // Sacred Terracotta / Kumbha Clay
    emissive: '#361500',
    height: 0.45,
    edgeColor: '#D97706'
  }
};

function normalizeName(name) {
  if (!name) return '';
  return name.toLowerCase()
    .replace(/&/g, 'and')
    .replace(/\(nct\)/g, '')
    .replace(/islands/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

const NORMALIZED_STATE_MAP = STATE_TEMPLE_STATS.reduce((acc, s) => {
  acc[normalizeName(s.name)] = s;
  return acc;
}, {});

function getStateForFeature(feature) {
  const rawName = feature?.properties?.ST_NM || feature?.properties?.NAME_1 || feature?.properties?.name;
  return NORMALIZED_STATE_MAP[normalizeName(rawName)] || null;
}

// ---------------------------------------------------------------------------
// 3D FLOATING SACRED YAJNA EMBERS (GENTLE WARM GLOW)
// ---------------------------------------------------------------------------
function SacredParticles({ count = 45 }) {
  const pointsRef = useRef();

  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 32;
      pos[i * 3 + 1] = Math.random() * 8 + 0.4;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 32;
      spd[i] = 0.008 + Math.random() * 0.015;
    }
    return [pos, spd];
  }, [count]);

  useFrame(() => {
    if (!pointsRef.current) return;
    const posAttr = pointsRef.current.geometry.attributes.position;
    for (let i = 0; i < count; i++) {
      posAttr.array[i * 3 + 1] += speeds[i];
      if (posAttr.array[i * 3 + 1] > 10) {
        posAttr.array[i * 3 + 1] = 0.4;
      }
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.11}
        color="#FFA726"
        transparent
        opacity={0.5}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// ---------------------------------------------------------------------------
// 3D SACRED TEMPLE SPIRE (SHIKHARA WITH DIVINE LIGHT BEAM)
// ---------------------------------------------------------------------------
function Temple3DSpire({ temple, coords, stateHeight, isSelected, onClick }) {
  const [hovered, setHovered] = useState(false);
  const lightBeamRef = useRef();
  const ringRef = useRef();

  const [worldX, worldZ] = useMemo(() => {
    return geoTo3D(coords[1], coords[0]);
  }, [coords]);

  const posY = stateHeight + 0.02;

  useFrame((state, delta) => {
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 1.5;
    }
    if (lightBeamRef.current) {
      lightBeamRef.current.material.opacity = 0.35 + Math.sin(state.clock.elapsedTime * 3) * 0.15;
    }
  });

  return (
    <group position={[worldX, posY, worldZ]}>
      {/* Sacred Base Disc */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.35, 16]} />
        <meshBasicMaterial color={isSelected || hovered ? "#FFFFFF" : "#F59E0B"} />
      </mesh>

      {/* Rotating Pulsing Ground Ring */}
      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <ringGeometry args={[0.45, 0.6, 16]} />
        <meshBasicMaterial 
          color="#F59E0B" 
          transparent 
          opacity={0.4} 
          side={THREE.DoubleSide} 
        />
      </mesh>

      {/* Golden Shikhara Spire (Tiered Cone) */}
      <mesh 
        position={[0, 0.6, 0]} 
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
        onPointerOut={(e) => { e.stopPropagation(); setHovered(false); }}
        onClick={(e) => { e.stopPropagation(); onClick(); }}
        style={{ cursor: 'pointer' }}
      >
        <coneGeometry args={[0.26, 1.2, 8]} />
        <meshStandardMaterial
          color={isSelected || hovered ? "#FFF6E5" : "#E5A93C"}
          metalness={0.8}
          roughness={0.2}
          emissive="#DF9214"
          emissiveIntensity={isSelected || hovered ? 0.8 : 0.25}
        />
      </mesh>

      {/* Golden Kalasha Top Orb */}
      <mesh position={[0, 1.25, 0]}>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshBasicMaterial color="#FFFFFF" />
      </mesh>

      {/* Vertical Divine Light Beam */}
      <mesh ref={lightBeamRef} position={[0, 2.5, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 3.8, 8]} />
        <meshBasicMaterial
          color="#FDE68A"
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Floating 3D/HTML Info Tag */}
      {(hovered || isSelected) && (
        <Html position={[0, 1.8, 0]} center distanceFactor={22} style={{ pointerEvents: 'none' }}>
          <div style={{
            background: 'rgba(15, 15, 18, 0.95)',
            border: '1px solid #E5A93C',
            borderRadius: '6px',
            padding: '4px 10px',
            color: '#FFFFFF',
            fontSize: '11px',
            fontWeight: 700,
            whiteSpace: 'nowrap',
            boxShadow: '0 4px 16px rgba(0,0,0,0.8), 0 0 12px rgba(229, 169, 60, 0.4)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <span>🔱</span>
            <span>{temple.name}</span>
          </div>
        </Html>
      )}
    </group>
  );
}

// ---------------------------------------------------------------------------
// 3D EXTRUDED STATE MESH
// ---------------------------------------------------------------------------
function State3DLandform({ feature, state, isSelected, isHovered, onHover, onSelect }) {
  const meshRef = useRef();
  const [localHover, setLocalHover] = useState(false);

  const tier = state?.densityTier || 1;
  const config = TIER_3D_CONFIG[tier];
  const targetHeight = isSelected ? config.height + 0.35 : config.height;

  // Convert GeoJSON geometry into THREE.ExtrudeGeometry
  const geometries = useMemo(() => {
    const geoms = [];
    if (!feature?.geometry) return geoms;

    const coordsList = feature.geometry.type === 'Polygon'
      ? [feature.geometry.coordinates]
      : feature.geometry.coordinates;

    coordsList.forEach((poly) => {
      const outerRing = poly[0];
      if (!outerRing || outerRing.length < 3) return;

      const shape = new THREE.Shape();
      outerRing.forEach((pt, i) => {
        // [pt[0] = lng, pt[1] = lat]
        const x = (pt[0] - CENTER_LNG) * SCALE;
        const y = (pt[1] - CENTER_LAT) * SCALE;
        if (i === 0) shape.moveTo(x, y);
        else shape.lineTo(x, y);
      });

      try {
        const extrudeGeom = new THREE.ExtrudeGeometry(shape, {
          depth: targetHeight,
          bevelEnabled: true,
          bevelThickness: 0.04,
          bevelSize: 0.03,
          bevelSegments: 1
        });
        geoms.push(extrudeGeom);
      } catch (err) {
        // Safe fallback for complex self-intersecting edge cases
      }
    });

    return geoms;
  }, [feature, targetHeight]);

  // Smooth elevation spring animation on hover
  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const targetY = isSelected ? 0.3 : (localHover || isHovered) ? 0.22 : 0;
    meshRef.current.position.y += (targetY - meshRef.current.position.y) * 12 * delta;
  });

  if (!geometries.length) return null;

  const activeColor = isSelected 
    ? '#F59E0B' 
    : (localHover || isHovered) 
    ? '#FFD700' 
    : config.color;

  return (
    <group 
      ref={meshRef}
      rotation={[-Math.PI / 2, 0, 0]}
      onPointerOver={(e) => {
        e.stopPropagation();
        setLocalHover(true);
        if (state) onHover(state.id);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setLocalHover(false);
        onHover(null);
      }}
      onClick={(e) => {
        e.stopPropagation();
        if (state) onSelect(state.id);
      }}
      style={{ cursor: 'pointer' }}
    >
      {geometries.map((geom, idx) => (
        <mesh key={idx} geometry={geom}>
          <meshStandardMaterial
            color={activeColor}
            metalness={0.2}
            roughness={0.4}
            emissive={isSelected ? "#D97706" : (localHover || isHovered) ? "#9A3412" : config.emissive}
            emissiveIntensity={isSelected ? 0.45 : (localHover || isHovered) ? 0.35 : 0.12}
          />
        </mesh>
      ))}
    </group>
  );
}

// ---------------------------------------------------------------------------
// CAMERA CONTROLLER WITH TARGET SMOOTHING
// ---------------------------------------------------------------------------
function CameraRig({ selectedStateId, viewMode }) {
  const controlsRef = useRef();
  const { camera } = useThree();

  useEffect(() => {
    if (!controlsRef.current) return;

    if (viewMode === 'micro' && selectedStateId) {
      const state = STATE_BY_ID[selectedStateId];
      if (state && state.iconicTemples?.length) {
        const topTemple = state.iconicTemples[0];
        const coords = getTempleCoordinates(topTemple.id);
        const [targetX, targetZ] = geoTo3D(coords[1], coords[0]);

        // Smoothly pan camera to active state focus
        controlsRef.current.target.set(targetX, 1.2, targetZ);
        camera.position.set(targetX, 12, targetZ + 14);
      }
    } else {
      // Macro View: Full Bharat overview
      controlsRef.current.target.set(0, 0.5, 0);
      camera.position.set(0, 24, 32);
    }
    controlsRef.current.update();
  }, [selectedStateId, viewMode, camera]);

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.08}
      maxPolarAngle={Math.PI / 2.15}
      minDistance={6}
      maxDistance={60}
    />
  );
}

// ---------------------------------------------------------------------------
// MAIN 3D CANVAS COMPONENT EXPORT
// ---------------------------------------------------------------------------
export default function Temples3DCanvas({
  selectedStateId,
  viewMode,
  hoveredStateId,
  onHoverState,
  onSelectState,
  selectedTemple,
  onSelectTemple,
  autoRotate = false
}) {
  const activeState = useMemo(() => {
    return selectedStateId ? STATE_BY_ID[selectedStateId] : null;
  }, [selectedStateId]);

  return (
    <div style={{
      width: '100%',
      height: '660px',
      minHeight: '520px',
      borderRadius: '8px',
      border: '1px solid rgba(212, 175, 55, 0.35)',
      overflow: 'hidden',
      background: 'radial-gradient(ellipse at 50% 25%, #2A1D15 0%, #1A120B 50%, #100A06 100%)',
      position: 'relative',
      boxShadow: 'inset 0 0 60px rgba(0,0,0,0.6)'
    }}>
      <Canvas
        camera={{ position: [0, 24, 32], fov: 46 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        {/* Sacred Temple 3D Lighting (Golden Hour Surya & Diya Lamps) */}
        <ambientLight intensity={1.2} color="#FFF3DC" />
        <directionalLight 
          position={[-16, 28, 20]} 
          intensity={2.1} 
          color="#FFE082" 
          castShadow 
        />
        <directionalLight 
          position={[12, 16, 20]} 
          intensity={0.8} 
          color="#FFD180" 
        />
        <pointLight position={[0, 14, 0]} intensity={1.5} color="#FFA726" distance={50} />
        <pointLight position={[-8, 6, 12]} intensity={1.1} color="#FFB74D" distance={30} />
        <pointLight position={[10, 6, -6]} intensity={0.9} color="#FF9800" distance={30} />

        {/* Camera Rig & OrbitControls */}
        <CameraRig selectedStateId={selectedStateId} viewMode={viewMode} />

        {/* Consecrated Sandstone & Teakwood Mandapa Altar */}
        <group position={[0, -0.28, 0]}>
          <mesh receiveShadow>
            <cylinderGeometry args={[26, 27, 0.55, 64]} />
            <meshStandardMaterial
              color="#22150E"
              roughness={0.6}
              metalness={0.25}
            />
          </mesh>
          {/* Concentric Sacred Lotus & Yantra Gold Rings */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.28, 0]}>
            <ringGeometry args={[23.5, 24.2, 64]} />
            <meshBasicMaterial color="#D4AF37" transparent opacity={0.65} />
          </mesh>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.28, 0]}>
            <ringGeometry args={[16.5, 17.0, 64]} />
            <meshBasicMaterial color="#E65100" transparent opacity={0.45} />
          </mesh>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.28, 0]}>
            <ringGeometry args={[10.0, 10.4, 64]} />
            <meshBasicMaterial color="#F59E0B" transparent opacity={0.35} />
          </mesh>
        </group>

        {/* Floating Sacred Yajna Embers (Gentle Warm Glow) */}
        <SacredParticles count={45} />

        {/* 3D Extruded Landforms for all 36 Indian States & UTs */}
        <group>
          {indiaStatesGeo.features.map((feature, idx) => {
            const state = getStateForFeature(feature);
            const isSelected = selectedStateId === state?.id;
            const isHovered = hoveredStateId === state?.id;

            return (
              <State3DLandform
                key={idx}
                feature={feature}
                state={state}
                isSelected={isSelected}
                isHovered={isHovered}
                onHover={onHoverState}
                onSelect={onSelectState}
              />
            );
          })}
        </group>

        {/* 3D Iconic Mega-Temple Spires & Beacons */}
        {viewMode === 'micro' && activeState && (
          <group>
            {activeState.iconicTemples.map((temple) => {
              const coords = getTempleCoordinates(temple.id);
              const isTempleSelected = selectedTemple?.id === temple.id;
              const stateTier = activeState.densityTier || 1;
              const stateHeight = TIER_3D_CONFIG[stateTier].height;

              return (
                <Temple3DSpire
                  key={temple.id}
                  temple={temple}
                  coords={coords}
                  stateHeight={stateHeight}
                  isSelected={isTempleSelected}
                  onClick={() => onSelectTemple({ ...temple, stateId: activeState.id, stateName: activeState.name })}
                />
              );
            })}
          </group>
        )}
      </Canvas>

      {/* 3D Navigation Controls Hint (Bottom-Right) */}
      <div style={{
        position: 'absolute',
        bottom: '16px',
        right: '16px',
        background: 'rgba(15, 15, 18, 0.88)',
        backdropFilter: 'blur(8px)',
        border: '1px solid #2A2A33',
        borderRadius: '8px',
        padding: '8px 12px',
        fontSize: '11px',
        color: '#9CA3AF',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: '6px'
      }}>
        <span>🖱️ Left Click + Drag: Rotate 3D</span>
        <span>•</span>
        <span>Scroll: Zoom</span>
        <span>•</span>
        <span>Right Click: Pan</span>
      </div>
    </div>
  );
}

