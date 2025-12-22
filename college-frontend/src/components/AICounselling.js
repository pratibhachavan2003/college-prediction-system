import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Avatar,
} from '@mui/material';
import Navbar from './Navbar';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import SendIcon from '@mui/icons-material/Send';

const AICounselling = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your AI Career Counsellor. I can help you with questions about engineering colleges, branches, career paths, and admission guidance. What would you like to know?",
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateResponse(input);
      const aiMessage = {
        id: messages.length + 2,
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  const generateResponse = (userInput) => {
    const input = userInput.toLowerCase();

    if (input.includes('cse') || input.includes('computer science')) {
      return "Computer Science Engineering offers excellent career prospects in software development, AI, data science, and cybersecurity. Average salary starts at ₹6-8 LPA for freshers and can go up to ₹15+ LPA with experience. Top companies like Google, Microsoft, Amazon actively recruit CSE graduates.";
    }

    if (input.includes('mechanical') || input.includes('mech')) {
      return "Mechanical Engineering provides opportunities in automotive, aerospace, manufacturing, and robotics. It's a versatile field with good job stability. Starting salary is around ₹4-6 LPA, with experienced engineers earning ₹10+ LPA. Companies like Tata Motors, Mahindra, and L&T are major recruiters.";
    }

    if (input.includes('jee') || input.includes('mht cet')) {
      return "For JEE Mains, focus on NCERT books and previous year papers. Practice regularly with mock tests. For MHT-CET, study state board books along with competitive exam material. Consistent practice and time management are key to success.";
    }

    if (input.includes('college') || input.includes('admission')) {
      return "College selection depends on your rank, preferred branch, and location preferences. Consider factors like placement record, faculty quality, infrastructure, and accreditation. Government colleges generally offer better value for money compared to private institutions.";
    }

    if (input.includes('branch') || input.includes('which branch')) {
      return "Choose a branch based on your interests and strengths. If you enjoy programming and problem-solving, go for CSE/IT. For design and manufacturing, consider Mechanical. If you like circuits and systems, ECE is a good choice. Research each branch thoroughly before deciding.";
    }

    if (input.includes('placement') || input.includes('job')) {
      return "Good colleges have placement rates above 80-90%. Average packages vary by branch and college tier. Tier-1 colleges (IITs, NITs) offer ₹8-15 LPA average, while good state colleges offer ₹3-7 LPA. Higher studies or certifications can significantly boost your career prospects.";
    }

    return "I'd be happy to help you with information about engineering colleges, branches, career guidance, or admission processes. Could you please provide more specific details about what you're looking for?";
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <>
      <Navbar />
      <Box sx={{ bgcolor: '#f8f9fa', minHeight: 'calc(100vh - 64px)', py: 4 }}>
        <Container maxWidth="md">
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 'bold',
              textAlign: 'center',
              mb: 4,
              color: '#1a1a1a',
            }}
          >
            AI Career Counsellor
          </Typography>

          <Paper
            elevation={3}
            sx={{
              height: '70vh',
              display: 'flex',
              flexDirection: 'column',
              borderRadius: 3,
              overflow: 'hidden',
            }}
          >
            <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
              <List>
                {messages.map((message) => (
                  <ListItem
                    key={message.id}
                    sx={{
                      justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                      mb: 1,
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        maxWidth: '70%',
                        flexDirection: message.sender === 'user' ? 'row-reverse' : 'row',
                      }}
                    >
                      <Avatar
                        sx={{
                          bgcolor: message.sender === 'ai' ? '#667eea' : '#764ba2',
                          width: 32,
                          height: 32,
                          mr: message.sender === 'user' ? 0 : 1,
                          ml: message.sender === 'user' ? 1 : 0,
                        }}
                      >
                        {message.sender === 'ai' ? <SmartToyIcon /> : <PersonIcon />}
                      </Avatar>
                      <Paper
                        elevation={1}
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          bgcolor: message.sender === 'user' ? '#667eea' : 'white',
                          color: message.sender === 'user' ? 'white' : 'text.primary',
                        }}
                      >
                        <ListItemText
                          primary={message.text}
                          primaryTypographyProps={{
                            variant: 'body1',
                            sx: { wordWrap: 'break-word' },
                          }}
                        />
                      </Paper>
                    </Box>
                  </ListItem>
                ))}
              </List>
            </Box>

            <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  fullWidth
                  placeholder="Ask me about colleges, branches, careers..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  variant="outlined"
                  sx={{ flexGrow: 1 }}
                />
                <Button
                  variant="contained"
                  onClick={handleSend}
                  disabled={!input.trim()}
                  sx={{
                    px: 3,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      opacity: 0.9,
                    },
                  }}
                >
                  <SendIcon />
                </Button>
              </Box>
            </Box>
          </Paper>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: 'center', mt: 2 }}
          >
            This AI counsellor provides general guidance. For personalized advice, consult with career counsellors or admission experts.
          </Typography>
        </Container>
      </Box>
    </>
  );
};

export default AICounselling;