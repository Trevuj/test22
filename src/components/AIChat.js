import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Paper, Box, Typography, TextField, Button, IconButton } from '@mui/material';
import styled from 'styled-components';
import { GoogleGenerativeAI } from "@google/generative-ai";
import ImageIcon from '@mui/icons-material/Image';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';

const MESSAGES_STORAGE_KEY = 'jarvis_chat_messages';

// Initialize the Gemini AI model
const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
  background: ${props => props.isExpanded ? '#000000' : 'rgba(0, 0, 0, 0.7)'};
  transition: background 0.3s ease;
  ${props => props.isDragActive && `
    border: 2px dashed rgba(147, 112, 219, 0.8);
    background: rgba(0, 0, 0, 0.85);
  `}

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: ${props => props.isExpanded ? '300px' : '150px'};
    height: ${props => props.isExpanded ? '300px' : '150px'};
    background: radial-gradient(
      circle,
      rgba(30, 144, 255, 0.3) 0%,
      rgba(30, 144, 255, 0.15) 35%,
      transparent 70%
    );
    border-radius: 50%;
    z-index: 0;
    animation: pulse 4s ease-in-out infinite;
  }

  /* Arc Reactor Inner Circles */
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: ${props => props.isExpanded ? '150px' : '80px'};
    height: ${props => props.isExpanded ? '150px' : '80px'};
    background: 
      radial-gradient(circle at center,
        rgba(30, 144, 255, 0.4) 0%,
        rgba(30, 144, 255, 0.2) 20%,
        transparent 60%
      ),
      conic-gradient(
        from 0deg,
        transparent 0deg,
        rgba(30, 144, 255, 0.3) 90deg,
        transparent 180deg,
        rgba(30, 144, 255, 0.3) 270deg,
        transparent 360deg
      );
    border-radius: 50%;
    box-shadow: 
      0 0 50px rgba(30, 144, 255, 0.3),
      inset 0 0 30px rgba(30, 144, 255, 0.4);
    z-index: 0;
    animation: rotate 10s linear infinite;
  }

  /* Additional Arc Reactor Ring */
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 200px;
    height: 200px;
    border: 2px solid rgba(30, 144, 255, 0.1);
    border-radius: 50%;
    box-shadow: 
      0 0 50px rgba(30, 144, 255, 0.1),
      inset 0 0 30px rgba(30, 144, 255, 0.1);
    z-index: 0;
    animation: pulse 4s ease-in-out infinite;
  }

  @keyframes pulse {
    0% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 0.8;
    }
    50% {
      transform: translate(-50%, -50%) scale(1.2);
      opacity: 0.5;
    }
    100% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 0.8;
    }
  }

  @keyframes rotate {
    from {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    to {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }
`;

const ArcReactorCore = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: ${props => props.isExpanded ? '60px' : '40px'};
  height: ${props => props.isExpanded ? '60px' : '40px'};
  background: radial-gradient(
    circle,
    rgba(30, 144, 255, 0.4) 0%,
    rgba(30, 144, 255, 0.2) 50%,
    transparent 70%
  );
  border-radius: 50%;
  box-shadow: 
    0 0 30px rgba(30, 144, 255, 0.4),
    inset 0 0 20px rgba(30, 144, 255, 0.4);
  z-index: 1;
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: ${props => props.isExpanded ? '30px' : '20px'};
    height: ${props => props.isExpanded ? '30px' : '20px'};
    background: rgba(30, 144, 255, 0.3);
    border-radius: 50%;
    box-shadow: 0 0 20px rgba(30, 144, 255, 0.5);
  }
`;

const MessagesContainer = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 20px;
  height: calc(100% - 80px);
  scroll-behavior: smooth;
  position: relative;
  z-index: 1;
  background: rgba(75, 0, 130, 0.2);
  backdrop-filter: blur(10px);

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(147, 112, 219, 0.1);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, #9370DB 0%, #8A2BE2 100%);
    border-radius: 10px;
    border: 2px solid rgba(147, 112, 219, 0.1);
    
    &:hover {
      background: linear-gradient(180deg, #8A2BE2 0%, #9370DB 100%);
    }
  }
`;

const MessageBubble = styled.div`
  max-width: 80%;
  margin: ${props => props.sender === 'jarvis' ? '12px auto 12px 0' : '12px 0 12px auto'};
  padding: 15px 20px;
  border-radius: ${props => props.sender === 'jarvis' ? '20px 20px 20px 0' : '20px 20px 0 20px'};
  background: ${props => props.sender === 'jarvis' ? 
    'linear-gradient(135deg, rgba(147, 112, 219, 0.3) 0%, rgba(147, 112, 219, 0.4) 100%)' : 
    'linear-gradient(135deg, #4F94CD 0%, #1E90FF 100%)'};
  color: ${props => props.sender === 'jarvis' ? '#E6E6FA' : '#ffffff'};
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  position: relative;
  animation: fadeIn 0.3s ease-out;
  border: 1px solid rgba(255, 255, 255, 0.1);
  white-space: pre-wrap;
  line-height: 1.6;

  /* Add these new styles for better formatting */
  ul, ol {
    margin: 8px 0 8px 20px;
    padding-left: 0;
  }

  li {
    margin: 6px 0;
  }

  p {
    margin: 10px 0;
  }

  /* Style bullet points */
  ul li {
    list-style-type: disc;
    padding-left: 5px;
  }

  /* Style for sections with asterisks */
  strong {
    color: ${props => props.sender === 'jarvis' ? '#fff' : '#E6E6FA'};
    display: block;
    margin-top: 15px;
    margin-bottom: 5px;
  }

  /* Add spacing between sections */
  & > *:not(:last-child) {
    margin-bottom: 10px;
  }

  img {
    max-width: 200px;
    max-height: 200px;
    border-radius: 8px;
    margin-top: 10px;
    display: block;
  }
`;

const InputContainer = styled.div`
  position: sticky;
  bottom: 0;
  padding: 20px;
  background: rgba(75, 0, 130, 0.8);
  backdrop-filter: blur(20px);
  border-top: 2px solid rgba(147, 112, 219, 0.3);
  display: flex;
  gap: 15px;
  align-items: center;
  box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.2);
  z-index: 2;
`;

const StyledInput = styled.input`
  flex: 1;
  padding: 15px 20px;
  border-radius: 25px;
  border: 2px solid rgba(147, 112, 219, 0.3);
  background: rgba(75, 0, 130, 0.4);
  color: #E6E6FA;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #1E90FF;
    box-shadow: 0 0 20px rgba(30, 144, 255, 0.3);
    background: rgba(75, 0, 130, 0.6);
  }

  &::placeholder {
    color: rgba(230, 230, 250, 0.6);
  }
`;

const SendButton = styled.button`
  padding: 15px 30px;
  border-radius: 25px;
  border: none;
  background: linear-gradient(135deg, #1E90FF 0%, #4169E1 100%);
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 15px rgba(30, 144, 255, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(30, 144, 255, 0.4);
    background: linear-gradient(135deg, #4169E1 0%, #1E90FF 100%);
  }

  &:active {
    transform: translateY(0);
  }
`;

const MessageTime = styled.span`
  font-size: 0.75rem;
  color: ${props => props.sender === 'jarvis' ? 'rgba(230, 230, 250, 0.7)' : 'rgba(255, 255, 255, 0.7)'};
  display: block;
  margin-top: 5px;
  text-align: ${props => props.sender === 'jarvis' ? 'left' : 'right'};
`;

const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

const EmptyStateImage = styled.img`
  max-width: 200px;
  height: auto;
  opacity: 0.8;
`;

const MessageText = styled.div`
  white-space: pre-wrap;
  line-height: 1.6;
  
  p {
    margin: 12px 0;
  }
  
  ul, ol {
    margin: 8px 0;
    padding-left: 20px;
  }
  
  li {
    margin: 6px 0;
  }
`;

const Message = styled.div`
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 8px;
  background-color: ${({ isUser }) => 
    isUser ? 'rgba(147, 112, 219, 0.2)' : 'rgba(255, 255, 255, 0.1)'};
  border: 1px solid ${({ isUser }) => 
    isUser ? 'rgba(147, 112, 219, 0.3)' : 'rgba(255, 255, 255, 0.2)'};
  color: #E6E6FA;
  animation: fadeIn 0.3s ease-in;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const ImagePreview = styled.img`
  max-width: 200px;
  max-height: 200px;
  margin: 10px 0;
  border-radius: 8px;
`;

const HiddenInput = styled.input`
  display: none;
`;

const BoundingBox = styled.div`
  position: absolute;
  border: 2px solid #9370DB;
  background-color: rgba(147, 112, 219, 0.2);
  pointer-events: none;
`;

const ImageContainer = styled.img`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 150px;
  height: auto;
  opacity: 0.8;
  transition: all 0.3s ease;
`;

const VersionText = styled.div`
  position: absolute;
  color: rgba(30, 144, 255, 0.8);
  font-weight: bold;
  font-size: ${props => props.isExpanded ? '1.2rem' : '0.9rem'};
  top: 20px;
  left: 20px;
  transform: none;
  z-index: 10;
  text-shadow: 
    0 0 10px rgba(30, 144, 255, 0.4),
    0 0 20px rgba(30, 144, 255, 0.2);
  pointer-events: none;
  opacity: 1;
  user-select: none;
`;

const ImageUploadButton = styled(IconButton)`
  color: rgba(30, 144, 255, 0.8);
  padding: 12px;
  transition: all 0.3s ease;

  &:hover {
    color: rgba(30, 144, 255, 1);
    transform: scale(1.1);
  }
`;

const ImagePreviewContainer = styled.div`
  position: fixed;
  bottom: 100px;
  left: 20px;
  max-width: 200px;
  max-height: 200px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const ClearButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 8px 16px;
  background: rgba(255, 0, 0, 0.2);
  border: 1px solid rgba(255, 0, 0, 0.3);
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  z-index: 10;
  
  &:hover {
    background: rgba(255, 0, 0, 0.3);
  }
`;

const FloatingLetter = styled.span`
  position: absolute;
  color: #1E90FF;
  font-size: 1.5rem;
  pointer-events: none;
  position: fixed;
  z-index: 9999;
  text-shadow: 0 0 8px rgba(30, 144, 255, 0.8);
  opacity: 0.8;
  transition: all 1s ease;
  transform-origin: center;

  @keyframes floatToReactor {
    0% {
      transform: translate(0, 0) scale(1);
      opacity: 1;
    }
    100% {
      transform: translate(
        ${props => props.targetX}px,
        ${props => props.targetY}px
      ) scale(0.1);
      opacity: 0;
    }
  }

  animation: floatToReactor 1s forwards;
`;

const FloatingImage = styled.img`
  position: absolute;
  width: 50px;
  height: 50px;
  object-fit: cover;
  pointer-events: none;
  position: fixed;
  z-index: 9999;
  box-shadow: 0 0 8px rgba(30, 144, 255, 0.8);
  border-radius: 8px;
  animation: floatToReactor 1s forwards;

  @keyframes floatToReactor {
    0% {
      transform: translate(0, 0) scale(1);
      opacity: 1;
    }
    100% {
      transform: translate(
        ${props => props.targetX}px,
        ${props => props.targetY}px
      ) scale(0.1);
      opacity: 0;
    }
  }
`;

const DropZone = styled.div`
  border: 2px dashed rgba(147, 112, 219, 0.3);
  border-radius: 20px;
  padding: 20px;
  text-align: center;
  background: rgba(75, 0, 130, 0.2);
  transition: all 0.3s ease;
  cursor: pointer;
  margin: 20px 0;
  
  ${props => props.isDragActive && `
    border-color: rgba(147, 112, 219, 0.8);
    background: rgba(75, 0, 130, 0.4);
  `}

  &:hover {
    border-color: rgba(147, 112, 219, 0.6);
    background: rgba(75, 0, 130, 0.3);
  }
`;

const formatAIResponse = (text) => {
  return text
    .replace(/\*\*/g, '')
    .replace(/\n\*/g, '\n���')
    .split('\n').map((line, index, array) => {
      if (line.trim().endsWith(':') && index < array.length - 1) {
        return line + '\n';
      }
      return line;
    }).join('\n');
};

const getApiKeys = () => {
  const keys = [];
  for (let i = 1; i <= 5; i++) {
    const key = process.env[`REACT_APP_GEMINI_API_KEY_${i}`];
    if (key) keys.push(key);
  }
  return keys;
};

const JARVIS_IDENTITY = `
I am Jarvis, an advanced AI assistant created and developed by PW Security under the guidance of The Professor. 
My primary purpose is to assist users with their queries while maintaining the highest standards of security and professionalism.
I have been specifically designed to handle complex tasks, provide detailed analysis, and ensure user safety at all times.
`;

// Add this helper function at the top of your file, outside the component
const safeLocalStorage = {
  setItem: (key, value) => {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      // If quota exceeded, clear old messages and try again
      if (e.name === 'QuotaExceededError' || e.name === 'QUOTA_EXCEEDED_ERR') {
        localStorage.clear();
        try {
          localStorage.setItem(key, value);
        } catch (innerError) {
          console.error('Failed to save to localStorage even after clearing:', innerError);
        }
      }
    }
  },
  getItem: (key) => {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      console.error('Failed to get from localStorage:', e);
      return null;
    }
  }
};

// Add this styled component for the image preview
const ImagePreviewCorner = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
`;

const PreviewImage = styled.img`
  max-width: 150px;
  max-height: 150px;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  border: 2px solid rgba(147, 112, 219, 0.3);
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    border-color: rgba(147, 112, 219, 0.8);
  }
`;

const RemoveImageButton = styled.button`
  background: rgba(255, 0, 0, 0.6);
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  color: white;
  cursor: pointer;
  position: absolute;
  top: -8px;
  right: -8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 0, 0, 0.8);
    transform: scale(1.1);
  }
`;

const AIChat = ({ isExpanded = false }) => {
  const [messages, setMessages] = useState(() => {
    const storedMessages = safeLocalStorage.getItem(MESSAGES_STORAGE_KEY);
    if (storedMessages) {
      try {
        return JSON.parse(storedMessages);
      } catch (e) {
        console.error('Failed to parse stored messages:', e);
        return [];
      }
    }
    return [];
  });
  const [inputValue, setInputValue] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [chatInstance, setChatInstance] = useState(null);
  const [currentApiKey, setCurrentApiKey] = useState(null);
  const [streamingText, setStreamingText] = useState('');
  const [boundingBoxes, setBoundingBoxes] = useState([]);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [currentImageData, setCurrentImageData] = useState(null);
  const [floatingLetters, setFloatingLetters] = useState([]);
  const [floatingImages, setFloatingImages] = useState([]);
  const letterCounter = useRef(0);
  const imageCounter = useRef(0);
  const inputRef = useRef(null);
  const arcReactorRef = useRef(null);

  const chatRef = useRef(null);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const imageRef = useRef(null);
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    // Limit the number of messages stored (e.g., last 50)
    const messagesToStore = messages.slice(-50);
    safeLocalStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(messagesToStore));
  }, [messages]);

  const initializeChat = async (apiKey) => {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
      const chat = await model.startChat({
        history: [
          {
            role: "user",
            parts: [{ text: "Hello" }],
          },
          {
            role: "model",
            parts: [{ text: `Greetings! ${JARVIS_IDENTITY} How may I assist you today?` }],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        },
      });
      return chat;
    } catch (error) {
      console.warn(`Failed to initialize chat with API key ending in ...${apiKey.slice(-4)}:`, error);
      throw error;
    }
  };

  useEffect(() => {
    const setupChat = async () => {
      const apiKeys = getApiKeys();
      
      for (const apiKey of apiKeys) {
        try {
          const chat = await initializeChat(apiKey);
          setChatInstance(chat);
          setCurrentApiKey(apiKey);
          console.log(`Successfully initialized with API key ending in ...${apiKey.slice(-4)}`);
          return;
        } catch (error) {
          continue;
        }
      }
      
      console.error('All API keys failed to initialize');
    };

    setupChat();
  }, []);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      const scrollContainer = messagesContainerRef.current;
      const scrollHeight = scrollContainer.scrollHeight;
      const height = scrollContainer.clientHeight;
      const maxScroll = scrollHeight - height;
      
      scrollContainer.scrollTo({
        top: maxScroll,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingText]);

  const handleImageSelect = async (event) => {
    const file = event.target.files[0];
    if (file && isExpanded) {
      // Reset states for new image
      setBoundingBoxes([]);
      setImageSize({ width: 0, height: 0 });
      
      // Set new image
      setSelectedImage(file);
      
      // Create image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageData = reader.result;
        setImagePreview(imageData);
        setCurrentImageData({
          file: file,
          preview: imageData
        });

        // Add floating animation
        const dialogContainer = document.querySelector('.MuiDialog-paper');
        if (dialogContainer) {
          const dialogRect = dialogContainer.getBoundingClientRect();
          const centerX = dialogRect.width / 2;
          const centerY = dialogRect.height / 2;
          const startY = dialogRect.height - 100;
          
          const newFloatingImage = {
            id: Date.now(),
            src: imageData,
            startX: centerX,
            startY: startY,
            targetX: 0,
            targetY: -(startY - centerY)
          };

          setFloatingImages(prev => [...prev, newFloatingImage]);

          setTimeout(() => {
            setFloatingImages(prev => 
              prev.filter(img => img.id !== newFloatingImage.id)
            );
          }, 1000);
        }
      };
      reader.readAsDataURL(file);
      event.target.value = ''; // Reset file input
    }
  };

  const fileToGenerativePart = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = reader.result.split(',')[1];
        resolve({
          inlineData: {
            data: base64Data,
            mimeType: file.type
          }
        });
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const detectBoundingBoxes = async (image) => {
    try {
      const imagePart = await fileToGenerativePart(image);
      const result = await chatInstance.sendMessage([
        imagePart,
        "Return bounding box coordinates for all visible objects in the format: [object_name, ymin, xmin, ymax, xmax]. Only return the coordinates, no other text."
      ]);
      
      const response = result.response.text();
      const coordinates = response.split('\n')
        .filter(line => line.trim())
        .map(line => {
          const [name, ymin, xmin, ymax, xmax] = line.split(',').map(val => val.trim());
          return {
            name,
            coords: {
              top: parseFloat(ymin) * imageSize.height,
              left: parseFloat(xmin) * imageSize.width,
              height: (parseFloat(ymax) - parseFloat(ymin)) * imageSize.height,
              width: (parseFloat(xmax) - parseFloat(xmin)) * imageSize.width
            }
          };
        });
      
      setBoundingBoxes(coordinates);
    } catch (error) {
      console.error('Error detecting objects:', error);
      setBoundingBoxes([]); // Reset on error
    }
  };

  const handleImageLoad = (event) => {
    const newSize = {
      width: event.target.width,
      height: event.target.height
    };
    setImageSize(newSize);
    
    // If we have a current image, detect boxes after size is set
    if (currentImageData?.file) {
      detectBoundingBoxes(currentImageData.file);
    }
  };

  const streamResponse = async (messageParts) => {
    try {
      const result = await chatInstance.sendMessageStream(messageParts);
      let fullResponse = '';
      
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        fullResponse += chunkText;
        setStreamingText(prev => prev + chunkText);
      }
      
      setMessages(prev => [...prev, { 
        sender: 'Jarvis',
        text: fullResponse
      }]);
      setStreamingText('');
    } catch (error) {
      console.error('Error streaming response:', error);
      const result = await chatInstance.sendMessage(messageParts);
      setMessages(prev => [...prev, { 
        sender: 'Jarvis',
        text: result.response.text()
      }]);
    }
  };

  const sendMessage = async () => {
    if ((!inputValue.trim() && !selectedImage) || !chatInstance) {
      console.log('No input or chat instance not ready');
      return;
    }

    let messageParts = [];

    try {
      setIsLoading(true);
      
      // Add message to UI with both text and image
      setMessages(prev => [...prev, { 
        sender: 'You', 
        text: inputValue || "Image uploaded", 
        image: imagePreview 
      }]);

      if (selectedImage) {
        const imagePart = await fileToGenerativePart(selectedImage);
        messageParts.push(imagePart);
      }
      
      if (inputValue.trim()) {
        messageParts.push({ 
          text: `${inputValue}\n\nRemember: ${JARVIS_IDENTITY}`
        });
      }

      // Clear input states
      setInputValue('');
      setSelectedImage(null);
      setImagePreview(null);
      setCurrentImageData(null);
      setBoundingBoxes([]);
      setImageSize({ width: 0, height: 0 });

      // Send message and handle response
      await streamResponse(messageParts);

    } catch (error) {
      console.error('Error sending message:', error);
      
      const apiKeys = getApiKeys();
      const currentIndex = apiKeys.indexOf(currentApiKey);
      const nextKeys = apiKeys.slice(currentIndex + 1);
      
      let messageSucceeded = false;
      
      for (const apiKey of nextKeys) {
        try {
          const chat = await initializeChat(apiKey);
          setChatInstance(chat);
          setCurrentApiKey(apiKey);
          
          const retryResult = await chat.sendMessage(messageParts);
          const retryResponse = retryResult.response.text();
          
          setMessages(prev => [...prev, { 
            sender: 'Jarvis',
            text: retryResponse
          }]);
          
          messageSucceeded = true;
          break;
        } catch (retryError) {
          console.warn(`Retry with API key ending in ...${apiKey.slice(-4)} failed:`, retryError);
        }
      }
      
      if (!messageSucceeded) {
        setMessages(prev => [...prev, { 
          sender: 'Jarvis',
          text: 'I apologize, but I encountered an error. Please try again.' 
        }]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatRef.current && !chatRef.current.contains(event.target)) {
        setIsActive(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [chatRef]);

  // Auto-focus input when dialog opens
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Auto-focus input when expanded
  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  const clearMessages = () => {
    setMessages([]);
    try {
      localStorage.removeItem(MESSAGES_STORAGE_KEY);
    } catch (e) {
      console.error('Failed to clear messages from localStorage:', e);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.length > inputValue.length && isExpanded) {
      const newLetter = value[value.length - 1];
      
      // Get the dialog container
      const dialogContainer = document.querySelector('.MuiDialog-paper');
      
      if (dialogContainer) {
        // Get dialog dimensions
        const dialogRect = dialogContainer.getBoundingClientRect();
        
        // Fixed start position at the input area, regardless of cursor position
        const startX = dialogRect.width / 2;  // Start from middle width
        const startY = dialogRect.height - 80; // Fixed position above input

        const newFloatingLetter = {
          id: letterCounter.current++,
          letter: newLetter,
          startX,
          startY,
          targetX: 0,  // No horizontal movement needed since starting from center
          targetY: -(dialogRect.height / 2) + 80  // Move up to center
        };

        setFloatingLetters(prev => [...prev, newFloatingLetter]);

        setTimeout(() => {
          setFloatingLetters(prev => 
            prev.filter(letter => letter.id !== newFloatingLetter.id)
          );
        }, 1000);
      }
    }
  };

  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];
    if (file) {
      // Check file type
      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        alert('Please upload only image files (JPEG, PNG, GIF, WEBP)');
        return;
      }

      // Check file size (e.g., max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size should be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setSelectedImage(file);
        setCurrentImageData({
          file: file,
          preview: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    multiple: false,
    noClick: true, // Prevents clicking on container to open file dialog
    noKeyboard: true // Disables keyboard interaction
  });

  return (
    <ChatContainer 
      isExpanded={isExpanded} 
      isDragActive={isDragActive}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      
      {/* Image Preview Corner */}
      {imagePreview && (
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.3 }}
        >
          <ImagePreviewCorner>
            <div style={{ position: 'relative' }}>
              <PreviewImage 
                src={imagePreview} 
                alt="Upload preview" 
              />
              <RemoveImageButton
                onClick={(e) => {
                  e.stopPropagation();
                  setImagePreview(null);
                  setSelectedImage(null);
                  setCurrentImageData(null);
                }}
              >
                ×
              </RemoveImageButton>
            </div>
          </ImagePreviewCorner>
        </motion.div>
      )}

      <VersionText isExpanded={isExpanded}>Jarvis v4.0</VersionText>
      <ArcReactorCore 
        className="arc-reactor-core" 
        isExpanded={isExpanded} 
        ref={arcReactorRef}
      />
      
      {/* Only render floating letters in expanded view */}
      {isExpanded && document.querySelector('.MuiDialog-paper') && floatingLetters.map(letter => (
        <FloatingLetter
          key={letter.id}
          targetX={letter.targetX}
          targetY={letter.targetY}
          style={{
            left: `${letter.startX}px`,
            top: `${letter.startY}px`,
          }}
        >
          {letter.letter}
        </FloatingLetter>
      ))}

      <MessagesContainer ref={messagesContainerRef}>
        {messages.map((message, index) => {
          const sender = message.sender?.toLowerCase() || (message.isUser ? 'user' : 'jarvis');
          return (
            <MessageBubble key={index} sender={sender}>
              {message.text}
              {message.image && <img src={message.image} alt="Uploaded content" />}
              <MessageTime sender={sender}>
                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </MessageTime>
            </MessageBubble>
          );
        })}
        {streamingText && (
          <MessageBubble sender="jarvis">
            {streamingText}
          </MessageBubble>
        )}
        {imagePreview && (
          <ImagePreviewContainer>
            <img src={imagePreview} alt="Upload preview" />
          </ImagePreviewContainer>
        )}
      </MessagesContainer>
      
      <InputContainer>
        {isExpanded && (
          <>
            <HiddenInput
              type="file"
              ref={fileInputRef}
              onChange={handleImageSelect}
              accept="image/*"
            />
            <ImageUploadButton
              onClick={() => fileInputRef.current.click()}
              disabled={isLoading}
            >
              <ImageIcon />
            </ImageUploadButton>
          </>
        )}
        <StyledInput
          ref={inputRef}
          type="text"
          placeholder="Type your message..."
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        />
        <SendButton onClick={sendMessage}>
          <span>Send</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 2L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </SendButton>
      </InputContainer>
      {isExpanded && messages.length > 0 && (
        <ClearButton onClick={clearMessages}>
          Clear Chat
        </ClearButton>
      )}

      {isExpanded && document.querySelector('.MuiDialog-paper') && floatingImages.map(image => (
        <FloatingImage
          key={image.id}
          src={image.src}
          targetX={image.targetX}
          targetY={image.targetY}
          style={{
            left: `${image.startX}px`,
            top: `${image.startY}px`,
          }}
        />
      ))}

      {/* Add this for visual feedback during drag (optional) */}
      {isDragActive && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(147, 112, 219, 0.1)',
              zIndex: 10,
              pointerEvents: 'none'
            }}
          />
        </AnimatePresence>
      )}
    </ChatContainer>
  );
};

export default AIChat;