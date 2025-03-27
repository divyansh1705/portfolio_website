"use client";
import React, { useState } from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import Groq from "groq-sdk";

const systemContext = {
  role: "system",
  content: `You are chatting with Divyansh, a full-stack developer with expertise in web development, creative problem-solving, and a passion for design. He has worked on projects in React, Node.js, and more. Answer questions based on his portfolio and experience.`,
};

const groq = new Groq({
  apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

export default function Home() {
  const [messages, setMessages] = useState([systemContext]);
  const [messageInput, setMessageInput] = useState("");
  const [loading, setLoading] = useState(false);

  // State for mobile menu toggle
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMobileMenu = () => setMenuOpen(prev => !prev);

  // Rename your message-sending function to submitForm
  const submitForm = async (e) => {
    e.preventDefault(); // Prevent default form submission
    const trimmed = messageInput.trim();
    if (!trimmed) return;
    
    // Append user's message to conversation
    const userMessage = { role: "user", content: trimmed };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setMessageInput("");
    setLoading(true);

    try {
      // Send the conversation history (including system context) to the API
      const response = await groq.chat.completions.create({
        messages: updatedMessages,
        model: "llama-3.3-70b-versatile",
      });
      const botReply = response.choices[0]?.message?.content || "Sorry, I didn't get that.";
      setMessages(prev => [...prev, { role: "bot", content: botReply }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: "bot", content: "Error: " + error.message }]);
    }

    setLoading(false);  
  };

  return (
    <>
      <header>
        <a href="#" className="logo-holder">
          <div className="logo">D</div>
          <div className="logo-text">Portfolio Website</div>
        </a>
        <nav>
          <ul id="menu" className={menuOpen ? "active" : ""}>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#skills">Skills</a>
            </li>
            <li>
              <a href="#projects">Projects</a>
            </li>
            <li>
              <a href="mailto:divyanshd@iitbhilai.ac.in" className="button">Contact Me</a>
            </li>
          </ul>
          <a href="#" className="mobile-toggle" onClick={toggleMobileMenu}>
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M5 7h14M5 12h14M5 17h10" />
            </svg>
          </a>
        </nav>
      </header>

      <main>
        <section className="hero container">
          <div className="hero-blue">
            <div>
              <h1>
                <small>Hi I'm</small>
                Divyansh Dubey
              </h1>
              <p>
                An Undergrad Student Specialisiong in Computer Science and Engineering
              </p>
              <div className="call-to-action">
                <a href="https://drive.google.com/file/d/13xbDOcdvjjS-dVF-0b7HUF8Sw69546f_/view?usp=sharing" className="button black">
                  View Resume
                </a>
                <a href="mailto:divyanshd@iitbhilai.ac.in" className="button white">
                  Contact Me
                </a>
              </div>
              <div className="social-links">
                <a href="https://github.com/divyansh1705">
                  <img src="./imgs/github.png" alt="GitHub" width="48" />
                </a>
                <a href="https://www.linkedin.com/in/divyansh-dubey-b55a49280">
                  <img src="./imgs/linkedin.png" alt="LinkedIn" width="48" />
                </a>
              </div>
            </div>
          </div>
          <div className="hero-yellow">
            <img src="./imgs/my-image.png" alt="Divyansh Dubey" width="100%" />
          </div>
        </section>

        <section className="logos container">
          <div className="marquee">
            <div className="track">
              <img src="./imgs/html.png" alt="HTML" width="128" />
              <img src="./imgs/css.png" alt="CSS" width="128" />
              <img src="./imgs/javascript.png" alt="JS" width="128" />
              <img src="./imgs/android-studio.png" width="128" alt="AndroidStudio" />
              <img src="./imgs/react.png" width="128" alt="React" />
              <img src="./imgs/nextjs.png" width="128" alt="Next JS" />
              <img src="./imgs/flutter.png" width="128" alt="Flutter" />
              <img src="./imgs/vscode.png" width="128" alt="VS Code" />
              <img src="./imgs/python.png" width="128" alt="Python" />
              <img src="./imgs/Cpp.png" width="128" alt="Cpp" />
              <img src="./imgs/Dart.png" width="128" alt="Dart" />
              {/* Repeat images as needed */}
            </div>
          </div>
        </section>

        <section id="skills" className="skills container">
          <h2>
            <small>About Me</small>
            Skills
          </h2>
          <div className="holder-blue">
            <div className="left-column">
              <ul>
                <li>C++</li>
                <li>HTML</li>
                <li>CSS</li>
                <li>JavaScript</li>
                <li>TypeScript</li>
                <li>React</li>
                <li>NextJS</li>
                <li>Node.js</li>
                <li>Express</li>
                <li>Python</li>
                <li>Dart</li>
                <li>Flutter</li>
                <li>Firebase</li>
                <li>MongoDB</li>
              </ul>
            </div>
            <div className="right-column">
              <h3>A bit about me</h3>
              <p>
              Hi! I'm Divyansh Dubey a BTech student at IIT Bhilai, passionate about web development, open-source contributions, and competitive programming
              </p>
              <p>
              I have worked on a variety of web and app development projects and actively participated in numerous hackathons and competitions. I am passionate about learning Machine Learning and creating impactful, practical projects that make a difference in people's lives.
              </p>
            </div>
          </div>
        </section>


        <section id="projects" className="bento container">
          <h2>
            <small>Previous</small>
            Completed Projects
          </h2>
          <div className="bento-grid">
            <a href="https://github.com/divyansh1705/ArtiFexAI" className="bento-item">
              <img src="./imgs/bento-1.jpg" alt="BGCCI" width="100%" />
            </a>
            <a href="https://chatapplication-4fu2.onrender.com/" className="bento-item">
              <img src="./imgs/bento-2.png" alt="Churhview" width="100%" />
            </a>
            <a href="https://github.com/divyansh1705/weather_app" className="bento-item">
              <img src="./imgs/bento-3.jpg" alt="Harley" width="100%" />
            </a>
            <a href="https://github.com/divyansh1705/DriveX" className="bento-item">
              <img src="./imgs/bento-4.jpg" alt="Bunbury" width="100%" />
            </a>
            <a href="https://github.com/divyansh1705/flash_chat" className="bento-item">
              <img src="./imgs/bento-7.png" alt="Running" width="100%" />
            </a>
            <a href="https://github.com/divyansh1705/CSP_PROJECT" className="bento-item">
              <img src="./imgs/bento-5.png" alt="School" width="100%" />
            </a>
          </div>
        </section>

        <section className="chatbot container">
          <h2>
            <small>Talk to me</small>
            Chatbot
          </h2>
          <div className="chatbot-blue">
            <div className="chat-info">
              <h3>AI Chatbot</h3>
              <p>
                I've put together a chatbot here which knows all my skills, work experience and has a copy of my CV/Resume.
                You can use it to ask questions about me to get a better idea of who I am and what I've done.
              </p>
              <p>
                Take a look at my resume. I'm currently looking for new opportunities
                so if you have a project you think I'd be a good fit for, please get in touch!
              </p>
              <a href="./Sample_Resume_Template.pdf" className="button black" target="_blank" rel="noopener noreferrer">
                Download Resume
              </a>
            </div>

            <div className="chat-box">
              <div className="scroll-area">
                <ul id="chat-log">
                  {messages.map((message, index) => (
                    <li key={index} className={message.role}>
                      <span className="avatar">{message.role === 'user' ? 'You' : 'AI'}</span>
                      <div className="message">
                        <ReactMarkdown>{message.content}</ReactMarkdown>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Use the new submitForm function for onSubmit */}
              <form onSubmit={submitForm} className="chat-message">
                <input 
                  type="text" 
                  placeholder="Hey Adrian, what skills are you best at?" 
                  value={messageInput} 
                  onChange={e => setMessageInput(e.target.value)} 
                />
                <button className="button black" type="submit" disabled={loading}>
                  {loading ? 'Sending...' : 'Send'}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
