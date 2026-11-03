import React, { useState, useEffect } from 'react';
import { 
  Award, 
  HelpCircle, 
  Layers, 
  CheckCircle, 
  XCircle, 
  RotateCcw, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft, 
  Printer, 
  Volume2, 
  Shuffle, 
  Flame, 
  Check, 
  BookOpen 
} from 'lucide-react';
import { quizQuestions, flashcardsData } from '../data/quizData';
import { playTempleBell } from '../utils/sound';

export default function QuizView() {
  const [activeTab, setActiveTab] = useState('quiz'); // 'quiz' | 'flashcards'

  // ==========================================
  // QUIZ STATE
  // ==========================================
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [userName, setUserName] = useState('');
  const [celebrate, setCelebrate] = useState(false);

  // ==========================================
  // FLASHCARDS STATE
  // ==========================================
  const [cardIndex, setCardIndex] = useState(0);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [masteredCards, setMasteredCards] = useState({});

  // Initialize quiz questions
  useEffect(() => {
    let qList = quizQuestions;
    if (selectedLevel !== 'All') {
      qList = quizQuestions.filter(q => q.level === selectedLevel);
    }
    // Shuffle questions
    const shuffled = [...qList].sort(() => 0.5 - Math.random());
    setCurrentQuestions(shuffled);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setIsQuizCompleted(false);
    setCelebrate(false);
  }, [selectedLevel]);

  const currentQ = currentQuestions[currentIndex];

  const handleOptionClick = (optionIdx) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(optionIdx);
    setIsAnswerSubmitted(true);

    if (optionIdx === currentQ.answer) {
      setScore(s => s + 1);
      playTempleBell(528); // Uplifting 528 Hz chime
    } else {
      playTempleBell(340); // Gentle low chime
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < currentQuestions.length) {
      setCurrentIndex(i => i + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setIsQuizCompleted(true);
      setCelebrate(true);
      playTempleBell(640);
    }
  };

  const handleRestartQuiz = () => {
    const shuffled = [...currentQuestions].sort(() => 0.5 - Math.random());
    setCurrentQuestions(shuffled);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setIsQuizCompleted(false);
    setCelebrate(false);
  };

  // Certificate Badge Title based on score
  const getCertificateTitle = (percent) => {
    if (percent >= 90) return { title: 'Vedic Acharya (Supreme Knower)', badge: '🏆', color: '#c69214', desc: 'Exhibits profound mastery of Vedic scriptures, sacred geography, and philosophical tenets.' };
    if (percent >= 75) return { title: 'Dharmic Vidvan (Honored Scholar)', badge: '📜', color: '#d9531e', desc: 'Possesses commendable wisdom and clear understanding of Sanatan traditions and lore.' };
    if (percent >= 50) return { title: 'Jnana Seeker (Devoted Disciple)', badge: '🪔', color: '#1a6b63', desc: 'Shows genuine curiosity and commendable knowledge of the eternal spiritual way.' };
    return { title: 'Abhyasi (Spiritual Aspirant)', badge: '🌱', color: '#801818', desc: 'Beginning the noble, lifelong journey of exploration and inner wisdom.' };
  };

  // Flashcards navigation
  const currentCard = flashcardsData[cardIndex];

  const handleNextCard = () => {
    setIsCardFlipped(false);
    setCardIndex((i) => (i + 1) % flashcardsData.length);
  };

  const handlePrevCard = () => {
    setIsCardFlipped(false);
    setCardIndex((i) => (i - 1 + flashcardsData.length) % flashcardsData.length);
  };

  const handleShuffleCards = () => {
    setIsCardFlipped(false);
    setCardIndex(Math.floor(Math.random() * flashcardsData.length));
  };

  const toggleMastered = (cardId) => {
    setMasteredCards(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };

  return (
    <div className="container animate-fade-in" style={{ padding: '36px 20px', maxWidth: '980px' }}>
      {/* Page Header */}
      <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 32px' }}>
        <span className="badge badge-saffron" style={{ marginBottom: '10px' }}>
          Jnana Pariksha • Self-Inquiry & Learning
        </span>
        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', marginBottom: '12px', color: 'var(--text-primary)' }}>
          Sanatan Dharma Quiz & Flashcards
        </h1>
        <p style={{ fontSize: '1.02rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          Deepen your understanding of ancient scriptures, deities, vahanas, renowned sages, and timeless philosophical principles through interactive quizzes and flashcards.
        </p>
      </div>

      {/* Mode Switcher Tabs */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '12px',
        marginBottom: '32px'
      }}>
        <button
          onClick={() => setActiveTab('quiz')}
          className={activeTab === 'quiz' ? 'btn btn-primary' : 'btn btn-outline'}
          style={{ padding: '10px 24px', fontSize: '0.92rem', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <HelpCircle size={18} />
          <span>Interactive Quiz Challenge</span>
        </button>
        <button
          onClick={() => setActiveTab('flashcards')}
          className={activeTab === 'flashcards' ? 'btn btn-gold' : 'btn btn-outline'}
          style={{ padding: '10px 24px', fontSize: '0.92rem', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <Layers size={18} />
          <span>Wisdom Flashcards Deck</span>
        </button>
      </div>

      {/* ======================================================== */}
      {/* TAB 1: INTERACTIVE QUIZ CHALLENGE */}
      {/* ======================================================== */}
      {activeTab === 'quiz' && (
        <div>
          {!isQuizCompleted && currentQ ? (
            <div>
              {/* Difficulty Level Filter Bar */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px',
                backgroundColor: 'var(--bg-card)',
                padding: '14px 20px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-light)',
                marginBottom: '24px',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>Difficulty:</span>
                  {['All', 'Beginner', 'Intermediate', 'Scholar'].map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => setSelectedLevel(lvl)}
                      style={{
                        padding: '4px 12px',
                        borderRadius: 'var(--radius-full)',
                        border: '1px solid',
                        borderColor: selectedLevel === lvl ? 'var(--accent-saffron)' : 'var(--border-light)',
                        backgroundColor: selectedLevel === lvl ? 'var(--accent-saffron)' : 'transparent',
                        color: selectedLevel === lvl ? '#fff' : 'var(--text-secondary)',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>

                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--accent-gold)' }}>
                  Question {currentIndex + 1} of {currentQuestions.length} • Score: {score}
                </div>
              </div>

              {/* Progress Bar */}
              <div style={{
                height: '6px',
                backgroundColor: 'var(--bg-surface)',
                borderRadius: 'var(--radius-full)',
                overflow: 'hidden',
                marginBottom: '28px'
              }}>
                <div style={{
                  height: '100%',
                  width: `${((currentIndex + 1) / currentQuestions.length) * 100}%`,
                  backgroundColor: 'var(--accent-gold)',
                  transition: 'width 0.3s ease'
                }} />
              </div>

              {/* Main Question Card */}
              <div style={{
                backgroundColor: 'var(--bg-card)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-strong)',
                padding: '36px',
                boxShadow: 'var(--shadow-md)',
                marginBottom: '24px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                  <span className="badge badge-gold" style={{ fontSize: '0.72rem' }}>
                    {currentQ.category}
                  </span>
                  <span className="badge badge-saffron" style={{ fontSize: '0.72rem' }}>
                    Level: {currentQ.level}
                  </span>
                </div>

                <h2 style={{
                  fontSize: 'clamp(1.2rem, 3vw, 1.55rem)',
                  color: 'var(--text-primary)',
                  lineHeight: 1.5,
                  marginBottom: '28px'
                }}>
                  {currentQ.question}
                </h2>

                {/* Option Buttons */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                  {currentQ.options.map((opt, optIdx) => {
                    const isSelected = selectedOption === optIdx;
                    const isCorrect = isAnswerSubmitted && optIdx === currentQ.answer;
                    const isWrong = isAnswerSubmitted && isSelected && optIdx !== currentQ.answer;

                    let bg = 'var(--bg-secondary)';
                    let border = 'var(--border-light)';
                    let color = 'var(--text-primary)';

                    if (isCorrect) {
                      bg = 'rgba(46, 204, 113, 0.15)';
                      border = '#27ae60';
                      color = '#27ae60';
                    } else if (isWrong) {
                      bg = 'rgba(231, 76, 60, 0.15)';
                      border = '#e74c3c';
                      color = '#e74c3c';
                    } else if (isSelected) {
                      bg = 'var(--bg-surface)';
                      border = 'var(--accent-saffron)';
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleOptionClick(optIdx)}
                        disabled={isAnswerSubmitted}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '14px 18px',
                          borderRadius: 'var(--radius-sm)',
                          border: `1.5px solid ${border}`,
                          backgroundColor: bg,
                          color: color,
                          fontSize: '1rem',
                          textAlign: 'left',
                          cursor: isAnswerSubmitted ? 'default' : 'pointer',
                          transition: 'all 0.2s ease',
                          fontWeight: isSelected || isCorrect ? 700 : 500,
                          fontFamily: 'inherit'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <span style={{
                            width: '26px',
                            height: '26px',
                            borderRadius: '50%',
                            backgroundColor: 'var(--bg-card)',
                            border: '1px solid var(--border-strong)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.82rem',
                            fontWeight: 700
                          }}>
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span>{opt}</span>
                        </div>

                        {isCorrect && <CheckCircle size={20} color="#27ae60" />}
                        {isWrong && <XCircle size={20} color="#e74c3c" />}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation Box (Visible after answering) */}
                {isAnswerSubmitted && (
                  <div style={{
                    backgroundColor: 'var(--bg-surface)',
                    borderLeft: '4px solid var(--accent-gold)',
                    padding: '16px 20px',
                    borderRadius: 'var(--radius-sm)',
                    marginBottom: '20px',
                    animation: 'fadeIn 0.2s ease-out'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px', fontWeight: 700, color: 'var(--accent-maroon)' }}>
                      <BookOpen size={16} />
                      <span>Scriptural Context & Explanation:</span>
                    </div>
                    <p style={{ fontSize: '0.92rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                      {currentQ.explanation}
                    </p>
                  </div>
                )}

                {/* Next Question Button */}
                {isAnswerSubmitted && (
                  <div style={{ textAlign: 'right' }}>
                    <button
                      onClick={handleNextQuestion}
                      className="btn btn-primary"
                      style={{ padding: '12px 28px', fontSize: '0.96rem' }}
                    >
                      <span>{currentIndex + 1 === currentQuestions.length ? 'View Final Results' : 'Next Question'}</span>
                      <ChevronRight size={18} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* ======================================================== */
            /* QUIZ COMPLETED: CERTIFICATE & BADGES */
            /* ======================================================== */
            <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
              {(() => {
                const total = currentQuestions.length;
                const percentage = Math.round((score / total) * 100);
                const honor = getCertificateTitle(percentage);

                return (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                    {/* Score Summary Box */}
                    <div style={{
                      backgroundColor: 'var(--bg-card)',
                      borderRadius: 'var(--radius-lg)',
                      border: '1px solid var(--border-strong)',
                      padding: '32px',
                      textAlign: 'center',
                      boxShadow: 'var(--shadow-md)'
                    }}>
                      <div style={{ fontSize: '3.5rem', marginBottom: '8px' }}>
                        {honor.badge}
                      </div>

                      <span className="badge badge-gold" style={{ fontSize: '0.8rem', marginBottom: '8px' }}>
                        Pariksha Completion
                      </span>

                      <h2 style={{ fontSize: '2rem', color: honor.color, marginBottom: '8px' }}>
                        {honor.title}
                      </h2>

                      <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', maxWidth: '580px', margin: '0 auto 16px' }}>
                        {honor.desc}
                      </p>

                      <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '24px',
                        backgroundColor: 'var(--bg-secondary)',
                        padding: '12px 28px',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        border: '1px solid var(--border-light)'
                      }}>
                        <span>Correct: <strong style={{ color: '#27ae60' }}>{score}</strong> / {total}</span>
                        <span>Percentage: <strong style={{ color: 'var(--accent-saffron)' }}>{percentage}%</strong></span>
                      </div>
                    </div>

                    {/* Printable Honorary Sanskrit Certificate */}
                    <div id="printable-certificate" style={{
                      background: 'radial-gradient(circle at center, #fffdf8 0%, #f6efe1 100%)',
                      border: '12px double #c69214',
                      borderRadius: '16px',
                      padding: '40px 32px',
                      color: '#2b1d15',
                      boxShadow: '0 8px 32px rgba(198, 146, 20, 0.25)',
                      textAlign: 'center',
                      position: 'relative'
                    }}>
                      <div style={{
                        fontFamily: 'var(--font-sanskrit)',
                        fontSize: '3rem',
                        color: '#d9531e',
                        lineHeight: 1,
                        marginBottom: '4px'
                      }}>
                        ॐ
                      </div>

                      <div style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '0.9rem',
                        fontWeight: 800,
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: '#c69214',
                        marginBottom: '6px'
                      }}>
                        Sanatan Dharma Jnana Kendra
                      </div>

                      <h2 style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
                        color: '#801818',
                        marginBottom: '8px'
                      }}>
                        Certificate of Spiritual Scholarship
                      </h2>

                      <p style={{ fontSize: '0.95rem', color: '#634f43', fontStyle: 'italic', marginBottom: '20px' }}>
                        विद्या ददाति विनयं विनयाद्याति पात्रताम् (Knowledge bestows humility, humility brings worthiness)
                      </p>

                      <div style={{ maxWidth: '420px', margin: '0 auto 20px' }}>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#8c786c', marginBottom: '4px' }}>
                          Candidate's Name for Certificate:
                        </label>
                        <input
                          type="text"
                          placeholder="Enter your name..."
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                          style={{
                            width: '100%',
                            padding: '10px 14px',
                            borderRadius: '8px',
                            border: '1px solid #c69214',
                            backgroundColor: '#ffffff',
                            color: '#2b1d15',
                            textAlign: 'center',
                            fontSize: '1.15rem',
                            fontWeight: 700,
                            fontFamily: 'var(--font-heading)'
                          }}
                        />
                      </div>

                      <p style={{ fontSize: '1rem', lineHeight: 1.8, maxWidth: '640px', margin: '0 auto 24px', color: '#2b1d15' }}>
                        This is to certify that <strong>{userName.trim() || 'The Devout Seeker'}</strong> has successfully 
                        completed the Sanatan Dharma Knowledge Assessment with a score of <strong>{percentage}%</strong>, 
                        earning the prestigious honorary title of <strong>{honor.title}</strong>.
                      </p>

                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        maxWidth: '540px',
                        margin: '0 auto',
                        paddingTop: '20px',
                        borderTop: '1px solid rgba(198, 146, 20, 0.4)',
                        fontSize: '0.85rem',
                        color: '#634f43'
                      }}>
                        <div>
                          <strong>Date:</strong> {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </div>
                        <div style={{
                          width: '64px',
                          height: '64px',
                          borderRadius: '50%',
                          border: '2px dashed #c69214',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#c69214',
                          fontWeight: 800,
                          fontSize: '0.75rem',
                          textTransform: 'uppercase'
                        }}>
                          Veda Seal
                        </div>
                        <div>
                          <strong>Portal:</strong> Sanatan Dharma
                        </div>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
                      <button
                        onClick={() => window.print()}
                        className="btn btn-gold"
                        style={{ padding: '12px 24px', fontSize: '0.95rem' }}
                      >
                        <Printer size={18} /> Print Certificate
                      </button>
                      <button
                        onClick={handleRestartQuiz}
                        className="btn btn-outline"
                        style={{ padding: '12px 24px', fontSize: '0.95rem' }}
                      >
                        <RotateCcw size={18} /> Retake Assessment
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 2: INTERACTIVE FLASHCARDS DECK */}
      {/* ======================================================== */}
      {activeTab === 'flashcards' && currentCard && (
        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          {/* Card Controls Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px',
            fontSize: '0.88rem',
            color: 'var(--text-muted)'
          }}>
            <span>Card {cardIndex + 1} of {flashcardsData.length}</span>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={handleShuffleCards}
                className="btn btn-outline"
                style={{ padding: '4px 10px', fontSize: '0.8rem' }}
                title="Shuffle Deck"
              >
                <Shuffle size={14} /> Shuffle
              </button>
              <button
                onClick={() => toggleMastered(currentCard.id)}
                className="btn btn-outline"
                style={{
                  padding: '4px 10px',
                  fontSize: '0.8rem',
                  color: masteredCards[currentCard.id] ? '#27ae60' : 'var(--text-muted)',
                  borderColor: masteredCards[currentCard.id] ? '#27ae60' : 'var(--border-strong)'
                }}
              >
                <Check size={14} /> {masteredCards[currentCard.id] ? 'Mastered' : 'Mark as Known'}
              </button>
            </div>
          </div>

          {/* 3D Flip Flashcard */}
          <div
            onClick={() => setIsCardFlipped(!isCardFlipped)}
            style={{
              perspective: '1000px',
              cursor: 'pointer',
              minHeight: '360px',
              marginBottom: '24px'
            }}
          >
            <div style={{
              position: 'relative',
              width: '100%',
              minHeight: '360px',
              borderRadius: 'var(--radius-lg)',
              transformStyle: 'preserve-3d',
              transition: 'transform 0.5s cubic-bezier(0.4, 0.2, 0.2, 1)',
              transform: isCardFlipped ? 'rotateY(180deg)' : 'none',
              boxShadow: 'var(--shadow-md)',
              border: '2px solid var(--border-strong)'
            }}>
              {/* Front Side */}
              <div style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backfaceVisibility: 'hidden',
                backgroundColor: 'var(--bg-card)',
                borderRadius: 'var(--radius-lg)',
                padding: '40px 32px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                textAlign: 'center'
              }}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <span className="badge badge-gold">{currentCard.category}</span>
                </div>

                <div>
                  <h2 style={{
                    fontSize: 'clamp(1.8rem, 4vw, 2.4rem)',
                    color: 'var(--accent-saffron)',
                    marginBottom: '12px'
                  }}>
                    {currentCard.front}
                  </h2>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    (Click anywhere or tap to flip and reveal wisdom)
                  </p>
                </div>

                <div style={{ fontSize: '0.82rem', color: 'var(--accent-gold)', fontWeight: 600 }}>
                  Tap to Reveal &rarr;
                </div>
              </div>

              {/* Back Side */}
              <div style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
                background: 'linear-gradient(135deg, var(--bg-card) 0%, var(--bg-surface) 100%)',
                borderRadius: 'var(--radius-lg)',
                padding: '36px 30px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                textAlign: 'center'
              }}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <span className="badge badge-saffron">{currentCard.category}</span>
                </div>

                <div>
                  {currentCard.sanskrit && (
                    <div style={{
                      fontFamily: 'var(--font-sanskrit)',
                      fontSize: '1.25rem',
                      fontWeight: 600,
                      color: 'var(--accent-gold)',
                      marginBottom: '10px'
                    }}>
                      {currentCard.sanskrit}
                    </div>
                  )}

                  <p style={{
                    fontSize: '1.05rem',
                    lineHeight: 1.7,
                    color: 'var(--text-primary)',
                    marginBottom: '12px'
                  }}>
                    {currentCard.back}
                  </p>

                  {currentCard.quote && (
                    <p style={{
                      fontSize: '0.88rem',
                      fontStyle: 'italic',
                      color: 'var(--accent-maroon)',
                      borderTop: '1px solid var(--border-light)',
                      paddingTop: '10px'
                    }}>
                      {currentCard.quote}
                    </p>
                  )}
                </div>

                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  (Click to flip back)
                </div>
              </div>
            </div>
          </div>

          {/* Previous / Next Card Controls */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px'
          }}>
            <button
              onClick={handlePrevCard}
              className="btn btn-outline"
              style={{ padding: '10px 20px', flex: 1 }}
            >
              <ChevronLeft size={16} /> Previous Card
            </button>
            <button
              onClick={handleNextCard}
              className="btn btn-primary"
              style={{ padding: '10px 20px', flex: 1 }}
            >
              Next Card <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

