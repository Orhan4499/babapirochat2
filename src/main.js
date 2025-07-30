import './style.css'
import { AuthScreen } from './components/AuthScreen.js'
import { ChatApp } from './components/ChatApp.js'

// Check if user is already authenticated
const savedUser = localStorage.getItem('babapiro_user')

if (savedUser) {
  // User is already logged in, show chat app
  initializeChatApp(JSON.parse(savedUser))
} else {
  // Show authentication screen
  showAuthScreen()
}

function showAuthScreen() {
  const authScreen = new AuthScreen((userData) => {
    // Authentication successful, show chat app
    initializeChatApp(userData)
  })
  
  document.querySelector('#app').innerHTML = authScreen.render()
  authScreen.init()
}

function initializeChatApp(userData) {
  document.querySelector('#app').innerHTML = `
    <div class="app-container">
      <header class="app-header">
        <div class="header-content">
          <div class="logo">
            <div class="logo-icon">💬</div>
            <h1>BabaPiroChat2</h1>
          </div>
          <div class="user-info">
            <div class="user-avatar">${userData.avatar}</div>
            <span class="username">${userData.username}</span>
            <button class="logout-btn" id="logoutBtn">Logout</button>
          </div>
        </div>
      </header>
      
      <main class="main-content">
        <div id="chat-container" class="chat-container">
          <div class="chat-sidebar">
            <div class="sidebar-header">
              <h3>Conversations</h3>
              <button class="new-chat-btn" id="newChatBtn">
                <span>+</span>
              </button>
            </div>
            <div class="chat-list" id="chatList">
              <div class="chat-item active" data-chat="general">
                <div class="chat-avatar">🌟</div>
                <div class="chat-info">
                  <div class="chat-name">General Chat</div>
                  <div class="chat-preview">Welcome to BabaPiroChat2!</div>
                </div>
              </div>
              <div class="chat-item" data-chat="random">
                <div class="chat-avatar">🎲</div>
                <div class="chat-info">
                  <div class="chat-name">Random</div>
                  <div class="chat-preview">Share anything here...</div>
                </div>
              </div>
              <div class="chat-item" data-chat="tech">
                <div class="chat-avatar">💻</div>
                <div class="chat-info">
                  <div class="chat-name">Tech Talk</div>
                  <div class="chat-preview">Discuss technology...</div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="chat-main">
            <div class="chat-header">
              <div class="chat-title">
                <div class="chat-avatar-large">🌟</div>
                <div>
                  <h2 id="currentChatName">General Chat</h2>
                  <p id="currentChatMembers">3 members online</p>
                </div>
              </div>
            </div>
            
            <div class="messages-container" id="messagesContainer">
              <div class="message received">
                <div class="message-avatar">🤖</div>
                <div class="message-content">
                  <div class="message-header">
                    <span class="message-author">BabaPiro Bot</span>
                    <span class="message-time">10:30 AM</span>
                  </div>
                  <div class="message-text">Welcome to BabaPiroChat2, ${userData.username}! This is a modern chat application built with vanilla JavaScript. Feel free to start chatting!</div>
                </div>
              </div>
            </div>
            
            <div class="message-input-container">
              <div class="message-input-wrapper">
                <input 
                  type="text" 
                  id="messageInput" 
                  placeholder="Type your message..." 
                  class="message-input"
                />
                <button id="sendBtn" class="send-btn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22,2 15,22 11,13 2,9"></polygon>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  `

  // Initialize the chat app
  const chatApp = new ChatApp(userData)
  chatApp.init()
  
  // Handle logout
  document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('babapiro_user')
    showAuthScreen()
  })
}

// Initialize the chat app
const chatApp = new ChatApp()
chatApp.init()