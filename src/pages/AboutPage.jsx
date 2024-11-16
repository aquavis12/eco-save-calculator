import React from 'react';

// Component: AboutPage
const AboutPage = () => {
  return (
    <div style={styles.pageContainer}>
      {/* Main content container */}
      <div style={styles.container}>
        <header style={styles.header}>
          <h1 style={styles.heading}>About E-Waste Recycling</h1>
        </header>

        {/* Info Block */}
        <section style={styles.infoBlock}>
          <p style={styles.infoText}>
            Every year, millions of electrical and electronic devices are discarded as products break or become obsolete. These discarded devices are considered e-waste and can become a threat to health and the environment if they are not disposed of and recycled appropriately.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.subHeading}>What is E-Waste?</h2>
          <p style={styles.paragraph}>
            Electronic waste, or e-waste, refers to discarded electronic devices like TVs, computers, smartphones, and household appliances. As technology evolves, older devices become obsolete, leading to an increase in e-waste. Proper recycling of e-waste is crucial to recover valuable materials, minimize environmental harm, and reduce the carbon footprint associated with producing new electronics.
          </p>
        </section>
        <section style={styles.section}>
          <h2 style={styles.subHeading}>Why Recycle E-Waste?</h2>
          <p style={styles.paragraph}>
            Recycling e-waste helps to recover valuable resources like copper, aluminum, and gold, reducing the demand for new mining. It also prevents harmful substances such as lead, mercury, and cadmium from contaminating the environment. Proper recycling supports sustainability by conserving natural resources, reducing pollution, and lowering carbon emissions.
          </p>
        </section>
        <section style={styles.section}>
          <h2 style={styles.subHeading}>Our Recycling Partners</h2>
          <p style={styles.paragraph}>
            We partner with certified e-waste recycling organizations to ensure safe and environmentally-friendly disposal of electronics. These partners adhere to standards like RoHS and WEEE, ensuring that all materials are responsibly recycled and reused.
          </p>
        </section>
        <section style={styles.section}>
          <h2 style={styles.subHeading}>Join Us in Making a Difference!</h2>
          <p style={styles.paragraph}>
            You can make a positive impact by recycling your old electronics responsibly. Reach out to our recycling partners or visit our designated drop-off points to dispose of your unwanted devices safely.
          </p>
        </section>
      </div>

      {/* Sidebar for materials and 3 R's */}
      <aside style={styles.sidebar}>
        <div style={styles.sidebarSection}>
          <h3 style={styles.sidebarHeading}>Materials Found in Electronics</h3>
          <ul style={styles.sidebarList}>
            <li><strong>Aluminum (Al):</strong> Used in casings, heat sinks, and more.</li>
            <li><strong>Copper (Cu):</strong> Essential for wiring and internal circuits.</li>
            <li><strong>Lead (Pb):</strong> Previously used in CRTs, now restricted.</li>
            <li><strong>Plastic (Pl):</strong> Common in casings, connectors, and cables.</li>
          </ul>
        </div>
        <div style={styles.sidebarSection}>
          <h3 style={styles.sidebarHeading}>Harmful Materials</h3>
          <ul style={styles.sidebarList}>
            <li><strong>Mercury (Hg):</strong> Toxic, found in older devices.</li>
            <li><strong>Cadmium (Cd):</strong> Carcinogenic, found in batteries.</li>
            <li><strong>BFRs:</strong> Disruptive to hormones, used in plastics.</li>
            <li><strong>Arsenic (As):</strong> Toxic, found in older semiconductors.</li>
          </ul>
        </div>
        <div style={styles.sidebarSection}>
          <h3 style={styles.sidebarHeading}>The 3 R's of Waste Management</h3>
          <ul style={styles.sidebarList}>
            <li><strong>Reduce:</strong> Use items with care to minimize waste.</li>
            <li><strong>Reuse:</strong> Use items or their parts again.</li>
            <li><strong>Recycle:</strong> Convert waste into reusable material.</li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

// CSS-in-JS styles for a smooth and classy design
const styles = {
  pageContainer: {
    display: 'grid',
    gridTemplateColumns: '6fr 2fr', // Main content 2x the width of sidebar
    gap: '20px',
    padding: '30px 20px',
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    backgroundColor: '#f9f9f9',
  },
  container: {
    maxWidth: '1300px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    padding: '20px',
  },
  header: {
    backgroundColor: '#283593',
    padding: '20px',
    borderRadius: '8px 8px 0 0',
  },
  heading: {
    color: '#FFFFFF',
    fontSize: '2.5em',
    textAlign: 'center',
    margin: '0',
  },
  infoBlock: {
    backgroundColor: '#ffeb3b',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '30px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  infoText: {
    fontSize: '1.2em',
    color: '#37474F',
    fontWeight: 'bold',
    lineHeight: '1.6',
  },
  section: {
    marginBottom: '30px',
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.05)',
  },
  subHeading: {
    color: '#37474F',
    fontSize: '1.8em',
    marginBottom: '15px',
  },
  paragraph: {
    fontSize: '1.3em',
    color: '#555',
    lineHeight: '1.8',
  },
  sidebar: {
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    height: 'fit-content',
  },
  sidebarSection: {
    marginBottom: '30px',
  },
  sidebarHeading: {
    color: '#37474F',
    fontSize: '1.5em',
    marginBottom: '10px',
  },
  sidebarList: {
    listStyleType: 'disc',
    paddingLeft: '20px',
    fontSize: '1.3em',
    color: '#555',
  },
};

export default AboutPage;
