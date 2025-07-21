import '../App.css'

const Monetization = () => {
  return (
    <div className="monetization-container">
      <h1 className="monetization-h1">Monetization</h1>
      <div className="monetization-content">
        <p>
          Support The Reaper Collective and help us grow! Your contributions go directly to server costs, upgrades, and community events.
        </p>
        <ul className="monetization-list">
          <li>💎 <strong>Donations:</strong> Help keep our servers running smoothly.</li>
        </ul>
        <div className="monetization-actions">
       
          <a href="https://youtube.com/@thereapercollectiveovt?si=Uf725kLJn99AxM0o" target="_blank" rel="noopener noreferrer" className="button">
            Our Youtube
          </a>
           <a href="https://www.tiktok.com/@the.reaper.collective?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer" className="button">
            Our TikTok
          </a>
        </div>
      </div>
    </div>
  )
}

export default Monetization