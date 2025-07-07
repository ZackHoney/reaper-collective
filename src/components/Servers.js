import '../App.css'

const discordServers = [
  {
    name: "Reaper Collective",
    invite: "https://discord.gg/your-invite-code",
    description: "Main community server for The Reaper Collective.",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJmtqPRq8BIcLaiNze1bYV6QIBcj2AWAd6Vw&s"
  },
  {
    name: "PvP Server",
    invite: "https://discord.gg/another-invite",
    description: "Join our PvP server for competitive action!",
    icon: "https://cdn.discordapp.com/icons/another-server-id/another-icon.png"
  }
  // Add more servers as needed
];

const Servers = () => {
  return (
    <div className="servers-container">
      <h1 className='servers-h1'>Discord Servers</h1>
      <div className="servers-list">
        {discordServers.map((server, idx) => (
          <div className="server-card" key={idx}>
            <img src={server.icon} alt={server.name} className="server-icon" />
            <h2>{server.name}</h2>
            <p>{server.description}</p>
            <a href={server.invite} target="_blank" rel="noopener noreferrer" className="button">
              Join Server
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Servers;