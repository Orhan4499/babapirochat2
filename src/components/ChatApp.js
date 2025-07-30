export class ChatApp {
  constructor() {
    this.currentChat = 'general'
    this.messages = {
      general: [
        {
          id: 1,
          author: 'BabaPiro Bot',
          avatar: '🤖',
          text: 'Welcome to BabaPiroChat2! This is a modern chat application built with vanilla JavaScript. Feel free to start chatting!',
          time: '10:30 AM',
          type: 'received'
        }
      ],
      random: [
        {
          id: 1,
          author: 'System',
          avatar: '⚡',
          text: 'Random chat room is ready! Share anything you want here.',
          time: '10:25 AM',
          type: 'received'
        }
      ],
      tech: [
        {
          id: 1,
          author: 'TechBot',
          avatar: '🔧',
          text: 'Welcome to Tech Talk! Discuss the latest in technology, programming, and innovation.',
          time: '10:20 AM',
          type: 'received'
        }
      ]
    }
    this.chatInfo = {
      general: { name: 'General Chat', avatar: '🌟', members: '3 members online' },
      random: { name: 'Random', avatar: '🎲', members: '2 members online' },
      tech: { name: 'Tech Talk', avatar: '💻', members: '5 members online' }
    }
  }

  init() {
    this.bindEvents()
    this.renderMessages()
  }

  bindEvents() {
    // Send message
    const sendBtn = document.getElementById('sendBtn')
    const messageInput = document.getElementById('messageInput')
    
    sendBtn.addEventListener('click', () => this.sendMessage())
    messageInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.sendMessage()
      }
    })

    // Chat switching
    const chatItems = document.querySelectorAll('.chat-item')
    chatItems.forEach(item => {
      item.addEventListener('click', () => {
        const chatId = item.dataset.chat
        this.switchChat(chatId)
      })
    })

    // New chat button
    const newChatBtn = document.getElementById('newChatBtn')
    newChatBtn.addEventListener('click', () => this.createNewChat())
  }

  sendMessage() {
    const messageInput = document.getElementById('messageInput')
    const text = messageInput.value.trim()
    
    if (!text) return

    const message = {
      id: Date.now(),
      author: 'You',
      avatar: '👤',
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'sent'
    }

    this.messages[this.currentChat].push(message)
    messageInput.value = ''
    this.renderMessages()

    // Simulate a response after a short delay
    setTimeout(() => this.simulateResponse(), 1000 + Math.random() * 2000)
  }

  simulateResponse() {
    const responses = [
      "That's interesting! Tell me more.",
      "I completely agree with you!",
      "Thanks for sharing that.",
      "Great point! I hadn't thought of it that way.",
      "That's really cool! 😊",
      "I see what you mean.",
      "Absolutely! That makes perfect sense.",
      "Wow, that's amazing!",
      "Thanks for the insight!",
      "That's a great question!"
    ]

    const avatars = ['🤖', '👨‍💻', '👩‍💻', '🧑‍🎓', '👨‍🔬', '👩‍🔬']
    const names = ['Alex', 'Sam', 'Jordan', 'Casey', 'Riley', 'Morgan']

    const randomResponse = responses[Math.floor(Math.random() * responses.length)]
    const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)]
    const randomName = names[Math.floor(Math.random() * names.length)]

    const response = {
      id: Date.now(),
      author: randomName,
      avatar: randomAvatar,
      text: randomResponse,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'received'
    }

    this.messages[this.currentChat].push(response)
    this.renderMessages()
  }

  switchChat(chatId) {
    this.currentChat = chatId
    
    // Update active chat item
    document.querySelectorAll('.chat-item').forEach(item => {
      item.classList.remove('active')
    })
    document.querySelector(`[data-chat="${chatId}"]`).classList.add('active')
    
    // Update chat header
    const chatInfo = this.chatInfo[chatId]
    document.getElementById('currentChatName').textContent = chatInfo.name
    document.getElementById('currentChatMembers').textContent = chatInfo.members
    document.querySelector('.chat-avatar-large').textContent = chatInfo.avatar
    
    this.renderMessages()
  }

  renderMessages() {
    const container = document.getElementById('messagesContainer')
    const messages = this.messages[this.currentChat] || []
    
    container.innerHTML = messages.map(message => `
      <div class="message ${message.type}">
        <div class="message-avatar">${message.avatar}</div>
        <div class="message-content">
          <div class="message-header">
            <span class="message-author">${message.author}</span>
            <span class="message-time">${message.time}</span>
          </div>
          <div class="message-text">${message.text}</div>
        </div>
      </div>
    `).join('')
    
    // Scroll to bottom
    container.scrollTop = container.scrollHeight
  }

  createNewChat() {
    const chatName = prompt('Enter chat room name:')
    if (!chatName) return

    const chatId = chatName.toLowerCase().replace(/\s+/g, '-')
    const avatars = ['🎯', '🎨', '🎵', '🎮', '📚', '🌈', '⭐', '🔥', '💎', '🚀']
    const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)]

    // Add to messages
    this.messages[chatId] = [
      {
        id: 1,
        author: 'System',
        avatar: '⚡',
        text: `Welcome to ${chatName}! This chat room was just created.`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'received'
      }
    ]

    // Add to chat info
    this.chatInfo[chatId] = {
      name: chatName,
      avatar: randomAvatar,
      members: '1 member online'
    }

    // Add to sidebar
    const chatList = document.getElementById('chatList')
    const chatItem = document.createElement('div')
    chatItem.className = 'chat-item'
    chatItem.dataset.chat = chatId
    chatItem.innerHTML = `
      <div class="chat-avatar">${randomAvatar}</div>
      <div class="chat-info">
        <div class="chat-name">${chatName}</div>
        <div class="chat-preview">New chat room created!</div>
      </div>
    `
    
    chatItem.addEventListener('click', () => this.switchChat(chatId))
    chatList.appendChild(chatItem)
    
    // Switch to new chat
    this.switchChat(chatId)
  }
}