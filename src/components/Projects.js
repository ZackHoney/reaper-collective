import '../App.css'

const currentProjects = [
  {
    title: "Website Revamp",
    description: "Redesigning the community website for a modern look and improved usability.",
    status: "In Progress"
  },
  {
    title: "PvP Server Expansion",
    description: "Adding new maps and features to the PvP server.",
    status: "In Progress"
  }
];

const upcomingProjects = [
  {
    title: "Community Events",
    description: "Organizing monthly tournaments and giveaways.",
    status: "Planned"
  },
  {
    title: "Mobile App",
    description: "Developing a companion app for server stats and notifications.",
    status: "Planned"
  }
];

const Projects = () => {
  return (
    <div className="projects-container">
      <h1 className="projects-h1">Projects</h1>
      <div className="projects-section">
        <h2 className='projects-h2'>Current Projects</h2>
        <ul className="projects-list">
          {currentProjects.map((proj, idx) => (
            <li className="project-card" key={idx}>
              <h3>{proj.title}</h3>
              <p>{proj.description}</p>
              <span className="project-status">{proj.status}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="projects-section">
        <h2 className='projects-h2'>Upcoming Projects</h2>
        <ul className="projects-list">
          {upcomingProjects.map((proj, idx) => (
            <li className="project-card" key={idx}>
              <h3>{proj.title}</h3>
              <p>{proj.description}</p>
              <span className="project-status">{proj.status}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Projects;