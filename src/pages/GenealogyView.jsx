import React, { useState } from 'react';
import { 
  GitFork, 
  Search, 
  Sun, 
  Moon, 
  Sparkles, 
  X, 
  ArrowDown, 
  Info, 
  BookOpen, 
  Users, 
  ShieldCheck, 
  Compass, 
  ChevronRight 
} from 'lucide-react';
import { genealogyData } from '../data/genealogyData';

export default function GenealogyView() {
  const [activeTab, setActiveTab] = useState('suryavansha'); // 'suryavansha' | 'chandravansha' | 'genesis'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPerson, setSelectedPerson] = useState(null);

  const currentDataset = genealogyData[activeTab];

  // Filter items based on search query
  const filteredTree = currentDataset.tree.filter((person) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      person.name.toLowerCase().includes(q) ||
      (person.sanskrit && person.sanskrit.includes(q)) ||
      (person.title && person.title.toLowerCase().includes(q)) ||
      (person.deeds && person.deeds.toLowerCase().includes(q)) ||
      (person.children && person.children.some(c => c.toLowerCase().includes(q)))
    );
  });

  return (
    <div className="container animate-fade-in" style={{ padding: '36px 20px', maxWidth: '1200px' }}>
      {/* Page Header */}
      <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 32px' }}>
        <span className="badge badge-gold" style={{ marginBottom: '10px' }}>
          Vamshavali • The Eternal Cosmic Lineages
        </span>
        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', marginBottom: '12px', color: 'var(--text-primary)' }}>
          Cosmic Genealogy & Lineage Tree
        </h1>
        <p style={{ fontSize: '1.02rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          Trace the sacred lineages of Sanatan tradition: from <strong>Brahma & the Saptarishis</strong>, 
          the <strong>Suryavansha</strong> (Solar Dynasty of Sri Rama), to the <strong>Chandravansha</strong> 
          (Lunar Dynasty of Sri Krishna, Emperor Bharata, and the Mahabharata).
        </p>
      </div>

      {/* Dynasty Selector Tabs */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '12px',
        marginBottom: '32px'
      }}>
        <button
          onClick={() => { setActiveTab('suryavansha'); setSearchQuery(''); setSelectedPerson(null); }}
          className={activeTab === 'suryavansha' ? 'btn btn-primary' : 'btn btn-outline'}
          style={{ padding: '10px 22px', fontSize: '0.92rem', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <Sun size={18} color={activeTab === 'suryavansha' ? '#fff' : 'var(--accent-saffron)'} />
          <span>Suryavansha (Solar Dynasty)</span>
        </button>

        <button
          onClick={() => { setActiveTab('chandravansha'); setSearchQuery(''); setSelectedPerson(null); }}
          className={activeTab === 'chandravansha' ? 'btn btn-gold' : 'btn btn-outline'}
          style={{ padding: '10px 22px', fontSize: '0.92rem', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <Moon size={18} color={activeTab === 'chandravansha' ? '#1a1202' : 'var(--accent-gold)'} />
          <span>Chandravansha (Lunar Dynasty)</span>
        </button>

        <button
          onClick={() => { setActiveTab('genesis'); setSearchQuery(''); setSelectedPerson(null); }}
          className={activeTab === 'genesis' ? 'btn btn-primary' : 'btn btn-outline'}
          style={{ padding: '10px 22px', fontSize: '0.92rem', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <Sparkles size={18} color={activeTab === 'genesis' ? '#fff' : 'var(--accent-gold)'} />
          <span>Cosmic Genesis & Saptarishis</span>
        </button>
      </div>

      {/* Dynasty Overview Banner */}
      <div style={{
        background: 'linear-gradient(135deg, var(--bg-card) 0%, var(--bg-surface) 100%)',
        border: '1px solid var(--border-strong)',
        borderRadius: 'var(--radius-lg)',
        padding: '30px',
        boxShadow: 'var(--shadow-sm)',
        marginBottom: '32px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <span className="badge badge-gold" style={{ fontSize: '0.75rem', marginBottom: '6px' }}>
              Dynastic Heritage
            </span>
            <h2 style={{ fontSize: '1.6rem', color: 'var(--accent-saffron)', lineHeight: 1.2 }}>
              {currentDataset.title}
            </h2>
            <div style={{
              fontFamily: 'var(--font-sanskrit)',
              fontSize: '1.15rem',
              color: 'var(--accent-gold)',
              fontWeight: 600,
              marginTop: '4px'
            }}>
              {currentDataset.sanskrit}
            </div>
          </div>

          {/* Quick Search in Lineage */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'var(--bg-secondary)',
            padding: '8px 16px',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--border-light)',
            minWidth: '260px'
          }}>
            <Search size={16} color="var(--accent-gold)" />
            <input
              type="text"
              placeholder={`Search within ${currentDataset.title}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                border: 'none',
                outline: 'none',
                background: 'transparent',
                fontSize: '0.88rem',
                color: 'var(--text-primary)',
                width: '100%',
                fontFamily: 'var(--font-body)'
              }}
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                <X size={15} />
              </button>
            )}
          </div>
        </div>

        <p style={{ fontSize: '0.96rem', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
          {currentDataset.description}
        </p>
      </div>

      {/* Main Lineage Flow View */}
      <div style={{ position: 'relative', margin: '20px 0' }}>
        {filteredTree.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '50px 20px', color: 'var(--text-muted)' }}>
            <p style={{ fontSize: '1.1rem', marginBottom: '6px' }}>No figures match "{searchQuery}"</p>
            <p style={{ fontSize: '0.85rem' }}>Try searching by name (e.g., Harishchandra, Bhagiratha, Krishna, Bhishma, Kashyapa)</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {filteredTree.map((person, index) => {
              const isSelected = selectedPerson?.id === person.id;
              return (
                <React.Fragment key={person.id}>
                  {/* Lineage Card */}
                  <div
                    onClick={() => setSelectedPerson(isSelected ? null : person)}
                    className="sanatan-card"
                    style={{
                      cursor: 'pointer',
                      borderLeft: isSelected ? '5px solid var(--accent-saffron)' : '5px solid var(--accent-gold)',
                      backgroundColor: isSelected ? 'var(--bg-surface)' : 'var(--bg-card)',
                      padding: '24px',
                      transition: 'all 0.25s ease'
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '12px',
                      marginBottom: '10px'
                    }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                          <span className="badge badge-saffron" style={{ fontSize: '0.7rem' }}>
                            {person.branch ? person.branch : `Gen ${person.generation || index + 1}`}
                          </span>
                          {person.era && (
                            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                              {person.era}
                            </span>
                          )}
                        </div>

                        <h3 style={{ fontSize: '1.35rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span>{person.name}</span>
                          {person.sanskrit && (
                            <span style={{
                              fontFamily: 'var(--font-sanskrit)',
                              fontSize: '1.05rem',
                              color: 'var(--accent-saffron)',
                              fontWeight: 600
                            }}>
                              ({person.sanskrit})
                            </span>
                          )}
                        </h3>

                        {person.title && (
                          <div style={{ fontSize: '0.88rem', color: 'var(--accent-gold)', fontWeight: 600, marginTop: '2px' }}>
                            {person.title}
                          </div>
                        )}
                      </div>

                      <span style={{
                        fontSize: '0.82rem',
                        color: 'var(--accent-saffron)',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}>
                        {isSelected ? 'Collapse Lore' : 'Explore Deeds'}
                        <ChevronRight size={16} style={{ transform: isSelected ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }} />
                      </span>
                    </div>

                    {/* Deeds & Contributions */}
                    <p style={{
                      fontSize: '0.94rem',
                      lineHeight: 1.7,
                      color: 'var(--text-secondary)',
                      marginBottom: person.children?.length > 0 ? '14px' : '0'
                    }}>
                      {person.deeds || person.description}
                    </p>

                    {/* Notable Descendants / Children Tags */}
                    {person.children && person.children.length > 0 && (
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        flexWrap: 'wrap',
                        paddingTop: '12px',
                        borderTop: '1px solid var(--border-light)',
                        fontSize: '0.82rem'
                      }}>
                        <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Notable Descendants:</span>
                        {person.children.map((child, cIdx) => (
                          <span
                            key={cIdx}
                            style={{
                              backgroundColor: 'var(--bg-secondary)',
                              color: 'var(--text-primary)',
                              padding: '2px 10px',
                              borderRadius: 'var(--radius-full)',
                              border: '1px solid var(--border-light)',
                              fontWeight: 600
                            }}
                          >
                            {child}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Flow Connector Line (except for last item) */}
                  {index < filteredTree.length - 1 && (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '24px',
                      color: 'var(--accent-gold)'
                    }}>
                      <div style={{
                        width: '2px',
                        height: '100%',
                        backgroundColor: 'var(--border-strong)',
                        position: 'relative'
                      }}>
                        <ArrowDown size={14} style={{
                          position: 'absolute',
                          bottom: '-4px',
                          left: '-6px',
                          color: 'var(--accent-saffron)'
                        }} />
                      </div>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

