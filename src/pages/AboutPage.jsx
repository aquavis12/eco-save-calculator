import React, { useState, useCallback, memo } from 'react';
import { Box, Typography, TextField, Button, Card, CardContent } from '@mui/material';
import { generateClient } from "aws-amplify/data";

// Initialize client outside component to prevent recreation
const client = generateClient();

// Memoized Info Section Component
const InfoSection = memo(({ title, content }) => (
  <section style={styles.section}>
    <h2 style={styles.subHeading}>{title}</h2>
    <p style={styles.paragraph}>{content}</p>
  </section>
));

// Memoized Points Display Component
const PointsDisplay = memo(({ userPoints }) => (
  <Box sx={{ marginTop: 4 }}>
    <Typography variant="body1">
      <strong>Your Eco Points:</strong> {userPoints.ecoPoints}
    </Typography>
  </Box>
));

// Content Configuration
const infoSections = [
  {
    title: 'What is E-Waste?',
    content: 'Electronic waste, or e-waste, refers to discarded electronic devices like TVs, computers, smartphones, and household appliances. As technology evolves, older devices become obsolete, leading to an increase in e-waste. Proper recycling of e-waste is crucial to recover valuable materials, minimize environmental harm, and reduce the carbon footprint associated with producing new electronics.'
  },
  {
    title: 'Why Recycle E-Waste?',
    content: 'Recycling e-waste helps to recover valuable resources like copper, aluminum, and gold, reducing the demand for new mining. It also prevents harmful substances such as lead, mercury, and cadmium from contaminating the environment. Proper recycling supports sustainability by conserving natural resources, reducing pollution, and lowering carbon emissions.'
  },
  {
    title: 'Our Recycling Partners',
    content: 'We partner with certified e-waste recycling organizations to ensure safe and environmentally-friendly disposal of electronics. These partners adhere to standards like RoHS and WEEE, ensuring that all materials are responsibly recycled and reused.'
  },
  {
    title: 'Join Us in Making a Difference!',
    content: 'You can make a positive impact by recycling your old electronics responsibly. Reach out to our recycling partners or visit our designated drop-off points to dispose of your unwanted devices safely.'
  }
];

const AboutPage = () => {
  const [searchData, setSearchData] = useState({ email: '', phoneNumber: '' });
  const [userPoints, setUserPoints] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setSearchData(prev => ({
      ...prev,
      [name]: value,
    }));
  }, []);
  const sendEmail = async (email, ecoPoints) => {
    try {
      const emailSubject = 'E-Waste Eco Points Details';
      const emailBody = `
        Dear Eco Saver,

        Congratulations! You have accumulated over 1000 Eco Points! You are now eligible to receive a voucher.
        Eco Points Earned: ${ecoPoints}

        We will reach out shortly with further details. 
        Thank you for making a positive impact on the environment!

        Best regards,
        The E-Waste Collection Team
      `;
      
      // AWS SES parameters
      const sesParams = {
        Source: 'support@ewasterecycles.com',  // Replace with your SES verified email
        Destination: {
          ToAddresses: [email],
        },
        Message: {
          Subject: {
            Data: emailSubject,
          },
          Body: {
            Text: {
              Data: emailBody,
            },
          },
        },
      };

      // Assuming you have AWS SDK set up with SES
      const ses = new AWS.SES();
      await ses.sendEmail(sesParams).promise();
      console.log('Email sent successfully via SES.');

    } catch (err) {
      console.error("Error sending email:", err);
    }
  };

  const handleCheckPoints = useCallback(async () => {
    if (!searchData.email || !searchData.phoneNumber) {
      setError('Please fill in both email and phone number.');
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      // Make the API call with the search parameters (email and phone number)
      const { data: userData, errors } = await client.models.FormSubmission.get({
        email: searchData.email,
        phoneNumber: searchData.phoneNumber
      });

      // Check for any errors returned from the API
      if (errors && errors.length > 0) {
        setError('Error fetching user data');
        console.error(errors);  // Log the errors for debugging
        return;
      }

      // If data is found, update the state
      if (userData) {
        const { ecoPoints, email, phoneNumber } = userData;

        setUserPoints({
          ecoPoints: ecoPoints || 0,  // Default to 0 if undefined
          email,
          phoneNumber
        });

        // Check if eco points are greater than or equal to 1000 and send email
        if (ecoPoints >= 1000) {
          await sendEmail(email, ecoPoints);

          // Update ecoPoints to 0 after sending the email
        await client.models.FormSubmission.update({
          email,
          phoneNumber,
          ecoPoints: 0  // Update ecoPoints to 0
        })
      }} else {
        // No matching records found
        setUserPoints(null);
        setError('No matching records found.');
      }
    } catch (err) {
      // Handle any errors that occur during the API call
      console.error('Error fetching user data:', err);
      setError('There was an error retrieving your data.');
    } finally {
      setIsLoading(false);
    }
  }, [searchData]);

  return (
    <div style={styles.pageContainer}>
      <div style={styles.container}>
        <header style={styles.header}>
          <h1 style={styles.heading}>About E-Waste Recycling</h1>
        </header>

        <section style={styles.infoBlock}>
          <p style={styles.infoText}>
            Every year, millions of electrical and electronic devices are discarded as products break or become obsolete. 
            These discarded devices are considered e-waste and can become a threat to health and the environment if they 
            are not disposed of and recycled appropriately.
          </p>
        </section>

        {infoSections.map(section => (
          <InfoSection 
            key={section.title}
            title={section.title}
            content={section.content}
          />
        ))}

        <Card sx={{ padding: 4, marginBottom: 4 }}>
          <CardContent>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Check Your Eco Points
            </Typography>
            <TextField
              label="Email"
              name="email"
              value={searchData.email}
              onChange={handleInputChange}
              fullWidth
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Phone Number"
              name="phoneNumber"
              value={searchData.phoneNumber}
              onChange={handleInputChange}
              fullWidth
              sx={{ marginBottom: 2 }}
            />
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleCheckPoints}
              disabled={isLoading}
            >
              {isLoading ? 'Checking...' : 'Check Points'}
            </Button>

            {userPoints && userPoints.ecoPoints !== undefined && (
              <PointsDisplay userPoints={userPoints} />
            )}

            {error && (
              <Typography color="error" sx={{ marginTop: 2 }}>
                {error}
              </Typography>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// CSS-in-JS styles for a smooth and classy design
const styles = {
  pageContainer: {
    display: 'grid',
    gap: '20px',
    padding: '30px 20px',
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    backgroundColor: '#f9f9f9',
  },
  container: {
    backgroundColor: '#f9f9f9',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
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
};

export default AboutPage;
