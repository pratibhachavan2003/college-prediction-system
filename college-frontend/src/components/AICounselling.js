import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
  TextField,
  Button,
  List,
  ListItem,
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
  const messagesEndRef = useRef(null);
  const timeoutRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;

    // Clear any pending timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const userMessage = {
      id: Math.random().toString(36).substr(2, 9),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    const userMessageInput = input; // Store input before clearing
    
    // Update messages with user message
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');

    // Simulate AI response after delay
    timeoutRef.current = setTimeout(() => {
      const aiResponse = generateResponse(userMessageInput);
      const aiMessage = {
        id: Math.random().toString(36).substr(2, 9),
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prevMsgs) => [...prevMsgs, aiMessage]);
      timeoutRef.current = null;
    }, 1000);
  };

  const generateResponse = (userInput) => {
    const input = userInput.toLowerCase();

    const branchKeywords = ['cse', 'computer science', 'ece', 'electrical', 'mechanical', 'mech', 'civil', 'it', 'chemical', 'branch', 'stream'];
    const examKeywords = ['jee', 'mht cet', 'cet', 'exam', 'prepare', 'preparation', 'study', 'mock'];
    const admissionKeywords = ['college', 'admission', 'rank', 'cutoff', 'counselling', 'seat', 'quota'];
    const careerKeywords = ['placement', 'job', 'salary', 'package', 'career', 'scope', 'opportunity'];

    const hasKeyword = (keywords) => keywords.some((keyword) => input.includes(keyword));

    if (hasKeyword(branchKeywords)) {
      return "Branch selection depends on your interests and strengths. For programming and software, CSE/IT is best. If you like machines and manufacturing, Mechanical is a strong choice. For electronics and communications, choose ECE. Share your interests and strengths for more personalized guidance.";
    }

    if (hasKeyword(examKeywords)) {
      return "For exam preparation, build a strong foundation with NCERT and past papers, then move to mock tests. Manage your time well, revise regularly, and focus on weak topics. If you tell me which exam or subject you are preparing for, I can suggest a study plan.";
    }

    if (hasKeyword(admissionKeywords)) {
      return "College selection is based on rank, branch preference, location, and budget. Look at placement records, faculty, infrastructure, and accreditation. If you share your exam score or preferred region, I can help narrow down suitable college options.";
    }

    if (hasKeyword(careerKeywords)) {
      return "Career prospects vary by branch and college. Good branches for placements include CSE, ECE, IT, and some core engineering fields. Certification, internships, and project experience improve job chances. Tell me your preferred field or salary expectations for more tailored advice.";
    }

    if (input.includes('how') || input.includes('what') || input.includes('why') || input.includes('when') || input.includes('where') || input.includes('?')) {
      return `That's a good question! I can help with branches, college choices, exam preparation, and career options. Please let me know more details about your situation so I can give a better response.`;
    }

    return `I can help with engineering college admissions, branch choices, exam preparation, career planning, and Maharashtra counselling details. Please ask your question in any way you like, and I will do my best to answer it.`;
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <>
      <Navbar />
      <Box sx={{ 
        bgcolor: '#f8fafc',
        minHeight: 'calc(100vh - 64px)', 
        py: 4,
        position: 'relative'
      }}>
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontWeight: 'bold',
                color: '#667eea',
                mb: 2,
              }}
            >
              🤖 AI Career Counsellor
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                color: '#764ba2', 
                mb: 1,
              }}
            >
              Your Personal Guide to Engineering Careers
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: '#64748b',
                maxWidth: 600,
                mx: 'auto'
              }}
            >
              Ask me anything about Maharashtra engineering colleges, branches, career paths, and admission guidance.
            </Typography>
          </Box>

          {/* Chat Interface */}
          <Paper
            elevation={10}
            sx={{
              height: '70vh',
              display: 'flex',
              flexDirection: 'column',
              borderRadius: 4,
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
              border: '2px solid rgba(255,255,255,0.1)'
            }}
          >
            {/* Messages Area */}
            <Box 
              sx={{ 
                flexGrow: 1, 
                overflow: 'auto', 
                p: 3,
                background: 'linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%)',
                '&::-webkit-scrollbar': {
                  width: '6px',
                },
                '&::-webkit-scrollbar-track': {
                  background: '#f1f1f1',
                  borderRadius: '3px'
                },
                '&::-webkit-scrollbar-thumb': {
                  background: '#667eea',
                  borderRadius: '3px',
                  '&:hover': {
                    background: '#5a67d8'
                  }
                }
              }}
            >
              <List sx={{ p: 0 }}>
                {messages.map((message, index) => (
                  <ListItem
                    key={message.id}
                    sx={{
                      justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                      mb: 2,
                      px: 0
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        maxWidth: '75%',
                        flexDirection: message.sender === 'user' ? 'row-reverse' : 'row',
                        animation: `slideIn 0.3s ease-out ${index * 0.1}s both`
                      }}
                    >
                      <Avatar
                        sx={{
                          bgcolor: message.sender === 'ai' ? '#667eea' : '#764ba2',
                          width: 40,
                          height: 40,
                          mr: message.sender === 'user' ? 0 : 2,
                          ml: message.sender === 'user' ? 2 : 0,
                          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                          border: '2px solid rgba(255,255,255,0.2)'
                        }}
                      >
                        {message.sender === 'ai' ? <SmartToyIcon /> : <PersonIcon />}
                      </Avatar>
                      <Paper
                        elevation={3}
                        sx={{
                          p: 2.5,
                          borderRadius: message.sender === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                          bgcolor: message.sender === 'user' 
                            ? '#e5e7eb' 
                            : '#ffffff',
                          boxShadow: message.sender === 'user' 
                            ? '0 4px 15px rgba(102, 126, 234, 0.4)' 
                            : '0 2px 8px rgba(0,0,0,0.1)',
                          position: 'relative',
                          minWidth: '60px',
                          '&::before': {
                            content: '""',
                            position: 'absolute',
                            width: 0,
                            height: 0,
                            border: '8px solid transparent',
                            ...(message.sender === 'user' 
                              ? {
                                  right: -8,
                                  top: 16,
                                  borderLeftColor: '#667eea',
                                  borderRight: 0
                                }
                              : {
                                  left: -8,
                                  top: 16,
                                  borderRightColor: 'rgba(0,0,0,0.15)',
                                  borderLeft: 0
                                }
                            )
                          }
                        }}
                      >
                        <Typography
                          variant="body1"
                          sx={{ 
                            wordWrap: 'break-word',
                            lineHeight: 1.6,
                            fontSize: '0.95rem',
                            color: message.sender === 'user' ? '#ffffff' : '#1a1a1a',
                            fontWeight: 500
                          }}
                        >
                          {message.text}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            display: 'block',
                            mt: 1,
                            opacity: message.sender === 'user' ? 0.9 : 0.7,
                            fontSize: '0.75rem',
                            color: message.sender === 'user' ? 'rgba(255,255,255,0.9)' : '#666'
                          }}
                        >
                          {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </Typography>
                      </Paper>
                    </Box>
                  </ListItem>
                ))}
                <div ref={messagesEndRef} />
              </List>
            </Box>

            {/* Input Area */}
            <Box 
              sx={{ 
                p: 3, 
                borderTop: '2px solid #e0e0e0',
                background: 'white'
              }}
            >
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-end' }}>
                <TextField
                  fullWidth
                  placeholder="Ask me about colleges, branches, careers..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  multiline
                  maxRows={3}
                  variant="outlined"
                  sx={{ 
                    flexGrow: 1,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 3,
                      backgroundColor: '#f8f9fa',
                      border: '2px solid #e2e8f0',
                      '&:hover': {
                        backgroundColor: '#ffffff',
                        borderColor: '#cbd5e1'
                      },
                      '&.Mui-focused': {
                        backgroundColor: '#ffffff',
                        borderColor: '#667eea',
                        boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)'
                      }
                    },
                    '& .MuiOutlinedInput-input': {
                      color: '#1a365d',
                      fontWeight: 500,
                      '&::placeholder': {
                        color: '#94a3b8',
                        opacity: 0.8
                      }
                    }
                  }}
                />
                <Button
                  variant="contained"
                  onClick={handleSend}
                  disabled={!input.trim()}
                  sx={{
                    px: 3,
                    py: 1.5,
                    borderRadius: 3,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)',
                    },
                    '&:disabled': {
                      background: '#ccc',
                      transform: 'none',
                      boxShadow: 'none'
                    }
                  }}
                >
                  <SendIcon sx={{ fontSize: 20 }} />
                </Button>
              </Box>
              
              {/* Typing Indicator */}
              {messages.length > 0 && messages[messages.length - 1].sender === 'user' && (
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, gap: 1 }}>
                  <Avatar sx={{ width: 24, height: 24, bgcolor: '#667eea' }}>
                    <SmartToyIcon sx={{ fontSize: 14 }} />
                  </Avatar>
                  <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
                    AI is typing...
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 0.5 }}>
                    <Box sx={{ width: 4, height: 4, bgcolor: '#667eea', borderRadius: '50%', animation: 'bounce 1.4s infinite ease-in-out both' }} />
                    <Box sx={{ width: 4, height: 4, bgcolor: '#667eea', borderRadius: '50%', animation: 'bounce 1.4s infinite ease-in-out both 0.2s' }} />
                    <Box sx={{ width: 4, height: 4, bgcolor: '#667eea', borderRadius: '50%', animation: 'bounce 1.4s infinite ease-in-out both 0.4s' }} />
                  </Box>
                </Box>
              )}
            </Box>
          </Paper>

          {/* Footer Note */}
          <Typography
            variant="body2"
            sx={{ 
              textAlign: 'center', 
              mt: 3, 
              color: '#667eea',
              fontStyle: 'italic'
            }}
          >
            💡 This AI counsellor provides general guidance. For personalized advice, consult with career counsellors or admission experts.
          </Typography>
        </Container>
      </Box>

      {/* Add CSS animations */}
      <style jsx global>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes bounce {
          0%, 80%, 100% {
            transform: scale(0);
          }
          40% {
            transform: scale(1);
          }
        }
      `}</style>
    </>
  );
};

export default AICounselling;