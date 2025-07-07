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
          <li>🎁 <strong>Patreon:</strong> Get exclusive rewards and early access to new features.</li>
          <li>🛒 <strong>Merch:</strong> Show your support with official community merchandise.</li>
        </ul>
        <div className="monetization-actions">
          <a href="https://www.patreon.com/" target="_blank" rel="noopener noreferrer" className="button">
            Support on Patreon
          </a>
          <a href="https://www.buymeacoffee.com/" target="_blank" rel="noopener noreferrer" className="button">
            Buy Me a Coffee
          </a>
        </div>
      </div>
    </div>
  )
}

export default Monetization