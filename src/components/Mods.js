import '../App.css'

const discordMods = [
  {
    name: "ShadowReaper",
    role: "Head Moderator",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    bio: "Ensures the community stays safe and fun for everyone."
  },
  {
    name: "GamerGal",
    role: "Moderator",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    bio: "Helps with events and keeps the chat friendly."
  },
  {
    name: "PvPEnforcer",
    role: "Moderator",
    avatar: "https://randomuser.me/api/portraits/men/65.jpg",
    bio: "Specializes in PvP server moderation and dispute resolution."
  }
  // Add more mods as needed
];

const Mods = () => {
  return (
    <div className="mods-container">
      <h1 className="mods-h1">Our Mods</h1>
      <div className="mods-list">
        {discordMods.map((mod, idx) => (
          <div className="mod-card" key={idx}>
            <img src={mod.avatar} alt={mod.name} className="mod-avatar" />
            <h2>{mod.name}</h2>
            <p className="mod-role">{mod.role}</p>
            <p className="mod-bio">{mod.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mods;