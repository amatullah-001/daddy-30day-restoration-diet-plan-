'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentDay, setCurrentDay] = useState(1);
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  const [journalEntries, setJournalEntries] = useState<Record<number, string>>({});
  const [mood, setMood] = useState<Record<number, string>>({});
  const [showModal, setShowModal] = useState(true);
  const [startDate, setStartDate] = useState<string>('');

  useEffect(() => {
    const saved = localStorage.getItem('completedDays');
    const savedJournal = localStorage.getItem('journalEntries');
    const savedMood = localStorage.getItem('mood');
    const savedStart = localStorage.getItem('startDate');

    if (saved) setCompletedDays(JSON.parse(saved));
    if (savedJournal) setJournalEntries(JSON.parse(savedJournal));
    if (savedMood) setMood(JSON.parse(savedMood));
    if (savedStart) {
      setStartDate(savedStart);
      setShowModal(false);
      calculateCurrentDay(savedStart);
    }
  }, []);

  const calculateCurrentDay = (start: string) => {
    const startD = new Date(start);
    const today = new Date();
    const diff = Math.floor((today.getTime() - startD.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    setCurrentDay(Math.max(1, Math.min(30, diff)));
  };

  const saveStartDate = () => {
    if (startDate) {
      localStorage.setItem('startDate', startDate);
      calculateCurrentDay(startDate);
      setShowModal(false);
    }
  };

  const toggleDay = (day: number) => {
    setCompletedDays((prev) => {
      const updated = prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day];
      localStorage.setItem('completedDays', JSON.stringify(updated));
      return updated;
    });
  };

  const toggleMood = (day: number, emoji: string) => {
    setMood((prev) => {
      const updated = { ...prev, [day]: prev[day] === emoji ? '' : emoji };
      localStorage.setItem('mood', JSON.stringify(updated));
      return updated;
    });
  };

  const saveJournal = (day: number, text: string) => {
    setJournalEntries((prev) => {
      const updated = { ...prev, [day]: text };
      localStorage.setItem('journalEntries', JSON.stringify(updated));
      return updated;
    });
  };

  const styles = `
    * { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --navy: #0d1b2a; --deep: #1b2d3f; --ice: #e8f4f8;
      --blue: #4a90b8; --light-blue: #7ec8e3; --silver: #b8c5d0;
      --gold: #c9a84c; --white: #f8fbfd; --red: #c1121f;
      --text: #1a2530; --muted: #5a7080; --soft: #f0f7fa;
    }
    body { font-family: 'Segoe UI', system-ui, sans-serif; background: var(--ice); color: var(--text); min-height: 100vh; }
    
    .header { background: linear-gradient(160deg, var(--navy), var(--deep), #1a3a5c); color: white; padding: 30px 20px 24px; text-align: center; position: relative; overflow: hidden; }
    .header::before { content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: radial-gradient(ellipse at center, rgba(126,200,227,0.08) 0%, transparent 70%); pointer-events: none; }
    .header .bismillah { font-size: 22px; color: var(--gold); margin-bottom: 10px; letter-spacing: 1px; }
    .header h1 { font-size: 23px; font-weight: 700; color: var(--white); letter-spacing: 0.5px; }
    .header .subtitle { font-size: 12px; color: var(--light-blue); margin-top: 6px; letter-spacing: 0.5px; }
    .header .ayah { font-size: 12px; color: var(--silver); margin-top: 12px; font-style: italic; line-height: 1.6; max-width: 400px; margin-left: auto; margin-right: auto; }
    
    .day-banner { background: linear-gradient(90deg, var(--deep), #1a3a5c); color: white; text-align: center; padding: 14px 20px; border-bottom: 2px solid var(--gold); }
    .day-banner .day-num { font-size: 22px; font-weight: 800; color: var(--gold); display: block; margin: 4px 0; }
    .day-banner small { font-size: 12px; color: var(--silver); display: block; margin-top: 2px; }
    .day-banner button { margin-top: 8px; background: rgba(255,255,255,0.1); color: var(--light-blue); border: 1px solid var(--light-blue); padding: 5px 14px; border-radius: 20px; font-size: 11px; font-weight: 600; cursor: pointer; }
    .day-banner button:hover { background: rgba(255,255,255,0.2); }
    
    .nav { display: flex; overflow-x: auto; background: var(--navy); scrollbar-width: none; position: sticky; top: 0; z-index: 100; border-bottom: 2px solid var(--gold); }
    .nav::-webkit-scrollbar { display: none; }
    .nav button { flex: 0 0 auto; padding: 12px 14px; background: none; border: none; color: var(--silver); font-size: 12px; font-weight: 600; cursor: pointer; white-space: nowrap; border-bottom: 2px solid transparent; margin-bottom: -2px; transition: all 0.2s; }
    .nav button.active { color: var(--gold); border-bottom-color: var(--gold); }
    
    .page { display: none; padding: 20px 16px 80px; max-width: 680px; margin: 0 auto; }
    .page.active { display: block; }
    
    .card { background: var(--white); border-radius: 14px; padding: 18px; margin-bottom: 16px; box-shadow: 0 2px 16px rgba(13,27,42,0.08); border: 1px solid rgba(184,197,208,0.3); }
    .card-title { font-size: 15px; font-weight: 700; color: var(--deep); margin-bottom: 12px; display: flex; align-items: center; gap: 8px; }
    
    .alert-box { background: #fdf6e3; border: 1px solid var(--gold); border-radius: 12px; padding: 14px 16px; margin-bottom: 16px; }
    .alert-title { font-size: 13px; font-weight: 700; color: #7a5c00; margin-bottom: 6px; }
    .alert-box p { font-size: 13px; color: #5a4a00; line-height: 1.6; }
    
    .quote-box { background: linear-gradient(135deg, var(--navy), var(--deep)); color: white; border-radius: 14px; padding: 22px 20px; text-align: center; margin-bottom: 16px; border: 1px solid rgba(201,168,76,0.3); }
    .quote-text { font-size: 14px; line-height: 1.8; font-style: italic; color: var(--silver); }
    .quote-src { font-size: 11px; color: var(--gold); margin-top: 10px; font-weight: 700; }
    
    .progress-bar-wrap { background: rgba(184,197,208,0.3); border-radius: 20px; height: 8px; margin: 8px 0; overflow: hidden; }
    .progress-bar-fill { height: 8px; border-radius: 20px; background: linear-gradient(90deg, var(--blue), var(--gold)); transition: width 0.5s ease; }
    
    .day-check-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 8px; margin-top: 10px; }
    .day-check { aspect-ratio: 1; border-radius: 10px; border: 1.5px solid var(--silver); background: white; display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s; font-size: 11px; font-weight: 700; color: var(--muted); gap: 2px; }
    .day-check:hover { border-color: var(--blue); }
    .day-check.done { background: var(--deep); border-color: var(--deep); color: var(--gold); }
    .day-check.today { border-color: var(--gold); box-shadow: 0 0 0 2px rgba(201,168,76,0.4); }
    .day-check .dc-num { font-size: 13px; font-weight: 800; }
    
    .track-row { display: flex; justify-content: space-between; align-items: flex-start; padding: 12px 0; border-bottom: 1px solid rgba(184,197,208,0.3); gap: 10px; }
    .track-row:last-child { border-bottom: none; }
    .track-label { font-size: 14px; font-weight: 600; color: var(--deep); }
    .track-detail { font-size: 12px; color: var(--muted); margin-top: 2px; line-height: 1.5; }
    .track-value { font-size: 13px; font-weight: 700; color: var(--blue); text-align: right; white-space: nowrap; }
    
    .journal-textarea { width: 100%; border: 1px solid rgba(184,197,208,0.5); border-radius: 8px; padding: 10px; font-size: 13px; font-family: inherit; resize: none; min-height: 70px; background: white; color: var(--text); line-height: 1.5; }
    .journal-textarea:focus { outline: none; border-color: var(--blue); }
    
    .mood-row { display: flex; gap: 10px; margin: 8px 0; flex-wrap: wrap; }
    .mood-btn { font-size: 22px; cursor: pointer; padding: 6px; border-radius: 10px; border: 2px solid transparent; transition: all 0.2s; background: transparent; }
    .mood-btn:hover { border-color: var(--silver); }
    .mood-btn.selected { border-color: var(--gold); background: #fdf6e3; }
    
    .modal-overlay { position: fixed; inset: 0; background: rgba(13,27,42,0.85); z-index: 999; display: flex; align-items: center; justify-content: center; padding: 20px; }
    .modal-box { background: white; border-radius: 18px; padding: 28px 24px; max-width: 340px; width: 100%; text-align: center; }
    .modal-box h2 { color: var(--deep); font-size: 20px; margin-bottom: 8px; }
    .modal-box p { font-size: 13px; color: var(--muted); line-height: 1.6; margin-bottom: 16px; }
    .modal-box input[type=date] { width: 100%; padding: 10px; border: 1.5px solid var(--blue); border-radius: 10px; font-size: 15px; font-family: inherit; margin-bottom: 14px; color: var(--text); }
    .modal-box button { background: var(--deep); color: var(--gold); border: none; padding: 12px 28px; border-radius: 20px; font-size: 15px; font-weight: 700; cursor: pointer; width: 100%; transition: all 0.2s; }
    .modal-box button:hover { background: var(--blue); }
    
    .meal-row { margin-bottom: 10px; }
    .meal-time { font-size: 11px; font-weight: 700; color: var(--blue); margin-bottom: 4px; text-transform: uppercase; }
    .meal-text { font-size: 14px; line-height: 1.6; color: var(--text); }
  `;

  return (
    <>
      <style>{styles}</style>
      
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div style={{ fontSize: '32px', marginBottom: '10px' }}>🌿</div>
            <h2>بِسْمِ اللَّهِ</h2>
            <p>When are you beginning your 30-day plan? This helps us track exactly which day you are on.</p>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <button onClick={saveStartDate}>Begin the Journey</button>
          </div>
        </div>
      )}

      <div className="header">
        <div className="bismillah">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</div>
        <h1>Your 30-Day Diabetes Management Plan</h1>
        <div className="subtitle">Evidence-Based · Nigerian Foods · Islamic Medicine</div>
        <div className="ayah">&quot;And when I am ill, it is He who cures me.&quot;<br />— Ash-Shu&apos;ara 26:80</div>
      </div>

      <div className="day-banner">
        <span className="day-num">Day {currentDay}</span>
        <small>You are on day {currentDay} of 30</small>
        <br />
        <button onClick={() => { setStartDate(''); setShowModal(true); }}>Change Start Date</button>
      </div>

      <nav className="nav">
        {['🏠 Home', '📅 Progress', '📓 Journal', '🌿 Protocol', '🍽️ Meal Plan', '✅ Your Foods', '🚫 Avoid', '🧠 Brain Link', '🛒 Kitchen', '🔬 Science'].map((label, idx) => {
          const pages = ['home', 'progress', 'journal', 'protocol', 'meals', 'foods', 'avoid', 'vessels', 'shopping', 'science'];
          return (
            <button
              key={pages[idx]}
              className={currentPage === pages[idx] ? 'active' : ''}
              onClick={() => setCurrentPage(pages[idx])}
            >
              {label}
            </button>
          );
        })}
      </nav>

      {/* HOME */}
      <div className={`page ${currentPage === 'home' ? 'active' : ''}`}>
        <div style={{ height: '16px' }}></div>
        <div className="alert-box">
          <div className="alert-title">📋 Clinical Recommendation</div>
          <p>This plan is built from peer-reviewed research and adapted for Nigerian foods and lifestyle. Standard of care for Type 2 diabetes includes a current HbA1c, kidney function panel, eye examination, and medication review. Please share this plan with your physician before starting.</p>
        </div>
        <div className="quote-box">
          <div className="quote-text">&quot;Make use of medical treatment, for Allah has not made a disease without appointing a remedy for it, with the exception of one disease — old age.&quot;</div>
          <div className="quote-src">— Prophet Muhammad ﷺ · Abu Dawud 3855</div>
        </div>
        <div className="card">
          <div className="card-title"><span>📋</span> What Is Happening in Your Body</div>
          <p style={{ fontSize: '14px', lineHeight: '1.7', color: 'var(--muted)' }}>Type 2 diabetes means your cells have become resistant to insulin — the key that unlocks them to receive glucose from the blood. Glucose then accumulates in the bloodstream instead of entering your cells for energy. Over time, this excess glucose damages blood vessels, nerves, kidneys, and eyes.</p>
        </div>
        <div className="card">
          <div className="card-title"><span>🗺️</span> Your 30-Day Roadmap</div>
          <div style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '4px' }}>Week 1–2: Remove blood sugar spikes</div>
          <div className="progress-bar-wrap"><div className="progress-bar-fill" style={{ width: '25%' }}></div></div>
          <div style={{ fontSize: '13px', color: 'var(--muted)', margin: '8px 0 4px' }}>Week 3: Add flaxseed, bitter leaf tea, longer walks</div>
          <div className="progress-bar-wrap"><div className="progress-bar-fill" style={{ width: '50%' }}></div></div>
          <div style={{ fontSize: '13px', color: 'var(--muted)', margin: '8px 0 4px' }}>Week 4: Consolidate — blood sugar stabilises</div>
          <div className="progress-bar-wrap"><div className="progress-bar-fill" style={{ width: '75%' }}></div></div>
          <div style={{ fontSize: '13px', color: 'var(--muted)', margin: '8px 0 4px' }}>After 30 days: HbA1c & fasting glucose test</div>
          <div className="progress-bar-wrap"><div className="progress-bar-fill" style={{ width: '100%' }}></div></div>
        </div>
        <div className="card">
          <div className="card-title"><span>⚡</span> The 3 Non-Negotiables</div>
          <div style={{ fontSize: '14px', lineHeight: '2.1' }}>
            <div>1️⃣ <strong>No sugar-sweetened or carbonated beverages</strong></div>
            <div>2️⃣ <strong>Black seed oil every morning</strong></div>
            <div>3️⃣ <strong>A 20-minute walk after the largest meal</strong></div>
          </div>
        </div>
      </div>

      {/* PROGRESS */}
      <div className={`page ${currentPage === 'progress' ? 'active' : ''}`}>
        <div style={{ height: '16px' }}></div>
        <div className="card">
          <div className="card-title"><span>📅</span> Mark Each Day Complete</div>
          <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '14px' }}>Tap a day to mark it done. Saved on this device.</p>
          <div className="day-check-grid">
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={i + 1}
                className={`day-check ${completedDays.includes(i + 1) ? 'done' : ''} ${i + 1 === currentDay ? 'today' : ''}`}
                onClick={() => toggleDay(i + 1)}
              >
                <div className="dc-num">{i + 1}</div>
                {completedDays.includes(i + 1) && <div style={{ fontSize: '15px' }}>✓</div>}
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <div className="card-title"><span>📊</span> Your Progress</div>
          <div style={{ fontSize: '14px', lineHeight: '2.1', color: 'var(--muted)' }}>
            {completedDays.length} of 30 days completed ({Math.round((completedDays.length / 30) * 100)}%)
          </div>
          <div className="progress-bar-wrap"><div className="progress-bar-fill" style={{ width: `${(completedDays.length / 30) * 100}%` }}></div></div>
        </div>
        <div className="card">
          <div className="card-title"><span>🩸</span> Key Numbers to Track</div>
          <div className="track-row">
            <div><div className="track-label">Fasting Blood Sugar</div><div className="track-detail">First thing in morning</div></div>
            <div className="track-value">Target<br/>4–7 mmol/L</div>
          </div>
          <div className="track-row">
            <div><div className="track-label">Post-meal Blood Sugar</div><div className="track-detail">2 hours after eating</div></div>
            <div className="track-value">Target<br/>&lt;10 mmol/L</div>
          </div>
          <div className="track-row">
            <div><div className="track-label">HbA1c</div><div className="track-detail">3-monthly blood test</div></div>
            <div className="track-value">Target<br/>&lt;7%</div>
          </div>
        </div>
      </div>

      {/* JOURNAL */}
      <div className={`page ${currentPage === 'journal' ? 'active' : ''}`}>
        <div style={{ height: '16px' }}></div>
        <div className="card">
          <div className="card-title"><span>📓</span> Weekly Check-In</div>
          {Array.from({ length: 7 }).map((_, i) => {
            const day = i + 1;
            return (
              <div key={day} style={{ marginBottom: '16px', paddingBottom: '16px', borderBottom: i < 6 ? '1px solid rgba(184,197,208,0.3)' : 'none' }}>
                <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--gold)', marginBottom: '6px' }}>Day {day}</div>
                <textarea
                  className="journal-textarea"
                  value={journalEntries[day] || ''}
                  onChange={(e) => saveJournal(day, e.target.value)}
                  placeholder="How did you feel today?"
                />
                <div className="mood-row">
                  {['😊', '😐', '😔', '😤', '😴'].map((emoji) => (
                    <button
                      key={emoji}
                      className={`mood-btn ${mood[day] === emoji ? 'selected' : ''}`}
                      onClick={() => toggleMood(day, emoji)}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* PROTOCOL, MEALS, FOODS, AVOID, VESSELS, SHOPPING, SCIENCE - Placeholders */}
      {['protocol', 'meals', 'foods', 'avoid', 'vessels', 'shopping', 'science'].map((page) => (
        <div key={page} className={`page ${currentPage === page ? 'active' : ''}`}>
          <div style={{ height: '16px' }}></div>
          <div className="card">
            <div className="card-title">{page.charAt(0).toUpperCase() + page.slice(1)}</div>
            <p style={{ color: 'var(--muted)', fontSize: '13px' }}>This section contains your complete diabetes management content.</p>
          </div>
        </div>
      ))}
    </>
  );
}
