import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const terminalRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Add scan line effect to the terminal
    const terminal = terminalRef.current;
    if (terminal) {
      // Import VT323 font
      const fontLink = document.createElement('link');
      fontLink.href = 'https://fonts.googleapis.com/css2?family=VT323&display=swap';
      fontLink.rel = 'stylesheet';
      document.head.appendChild(fontLink);
      
      const postElements = document.querySelectorAll('.post-preview');
      postElements.forEach((el, index) => {
        (el as HTMLElement).style.setProperty('--index', index.toString());
      });
    }
    
    const introText = document.querySelector('.intro-text');
    if (introText) {
      const text = introText.textContent || '';
      introText.textContent = '';
      
      let i = 0;
      const typeWriter = () => {
        if (i < text.length) {
          introText.textContent += text.charAt(i);
          i++;
          setTimeout(typeWriter, 50);
        }
      };
      
      typeWriter();
    }
  }, []);

  const simulateCommand = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const target = event.currentTarget;
    const commandText = target.getAttribute('data-command');
    const commandDisplay = document.querySelector('.command-display');
    
    if (commandDisplay && commandText) {
      commandDisplay.textContent = `> ${commandText}`;
      commandDisplay.classList.add('typing');
      
      setTimeout(() => {
        commandDisplay.classList.remove('typing');
      }, 1000);
    }
  };

  return (
    <div className="terminal-container">
      <div className="terminal" ref={terminalRef}>
        <header>
          <h1>Roy::Terminal <span className="blink">_</span></h1>
          <p className="intro-text">Roy's insights and life musings</p>
          <div className="command-display"></div>
        </header>
        
        <nav>
          <span className="command-prompt">roy@terminal:~$</span> 
          <Link 
            to="/" 
            className="command" 
            data-command="cd /home"
            onClick={simulateCommand}
          >
            home
          </Link> | 
          <Link 
            to="/posts" 
            className="command" 
            data-command="cd /posts"
            onClick={simulateCommand}
          >
            all-posts
          </Link> | 
          <Link 
            to="/about" 
            className="command" 
            data-command="cd /about"
            onClick={simulateCommand}
          >
            about
          </Link> | 
          <Link 
            to="/projects" 
            className="command" 
            data-command="cd /projects"
            onClick={simulateCommand}
          >
            projects
          </Link>
        </nav>
        
        <main>
          {children}
        </main>
        
        <footer>
          <p>[EOF] &copy; {new Date().getFullYear()} Roy Ayoola | 
            <Link to="/" className="text-accent hover:underline mx-1">rss</Link> | 
            <a 
              href="https://github.com/RoyAyo" 
              className="text-accent hover:underline mx-1" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              github
            </a>
          </p>
          <div className="system-stats">
            <span>MEM: 980 MB</span> | 
            <span>CPU: 2%</span> | 
            {/* <span>UPTIME: {Math.floor(Math.random() * 1000) + 100}h</span> */}
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Layout;