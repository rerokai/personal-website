import './css/about.css'
import './css/skills.css'
import './css/work.css'
import { Link } from 'react-router-dom';
import { ASCII } from './ascii';
import SvgTitle from './icons/svg_title';
import MailIcon from './icons/mail';
import TelegramIcon from './icons/telegram';
import GithubIcon from './icons/github';

export function Me() {
  return (
    <div className="me-page" style={{overflowX: 'hidden'}} >

      <section className="about">
        <div className="about-left">
          <div className="about-title">
              <div className="about-title-border"></div>
              <SvgTitle>About me</SvgTitle>
          </div>
          <div className='metagroup'>
            <p className="meta">NAME: Anastasia</p>
            <p className="meta">LOCATION: Russia</p>
            <p className="meta">OCCUPATION: Infrastructure engineer</p>
          </div>
          <p className="about-text">I’m a student and Junior DevOps Engineer at a major Russian tech company,<br></br> 
          working with infrastructure automation, CI/CD, and Linux-based systems. <br></br> 
          Beyond work, I enjoy robotics, experimenting with infrastructure,<br></br> 
          and building cute interfaces!
          </p>
          <a className='link' href="https://t.me/rerokai">
            <div className='icon-link'>
                <svg width="24" height="22" viewBox="0 0 32 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M30.4843 0.436736C30.2378 0.222489 29.9376 0.0802154 29.6164 0.0253425C29.2951 -0.0295303 28.9651 0.00509258 28.662 0.125457L1.13531 11.0012C0.775471 11.1434 0.47108 11.3989 0.267688 11.7295C0.0642959 12.0602 -0.027161 12.4482 0.00700339 12.8355C0.0411678 13.2228 0.199116 13.5885 0.457213 13.878C0.71531 14.1675 1.05968 14.3651 1.43878 14.4414L8.91035 15.9443V25.2193C8.90661 25.5761 9.01009 25.9257 9.20722 26.2224C9.40436 26.5191 9.68597 26.7491 10.0152 26.8821C10.2358 26.975 10.4724 27.0232 10.7115 27.0238C10.9452 27.0231 11.1764 26.9757 11.3917 26.8844C11.607 26.7931 11.8021 26.6597 11.9657 26.4919L16.2309 22.2025L22.524 27.772C22.8483 28.0617 23.2668 28.2219 23.7005 28.2223C23.8891 28.2221 24.0764 28.1922 24.2558 28.1337C24.5516 28.0394 24.8176 27.8687 25.0273 27.6387C25.237 27.4087 25.3831 27.1274 25.4509 26.8228L31.061 2.2029C31.1343 1.88361 31.1193 1.55025 31.0176 1.23892C30.9159 0.927605 30.7315 0.650193 30.4843 0.436736ZM1.19554 12.7294C1.1807 12.5998 1.20976 12.4689 1.27802 12.358C1.34627 12.247 1.44974 12.1625 1.5717 12.118L26.8042 2.14866L9.36858 14.8128L1.67278 13.2648C1.54494 13.2426 1.42829 13.1776 1.34169 13.0805C1.25509 12.9833 1.2036 12.8596 1.19554 12.7294ZM11.122 25.6435C11.0385 25.7274 10.9322 25.7845 10.8165 25.8077C10.7008 25.8308 10.5808 25.819 10.4718 25.7736C10.3628 25.7281 10.2696 25.6512 10.2041 25.5526C10.1385 25.4539 10.1035 25.3379 10.1035 25.2193V16.7797L15.3333 21.4082L11.122 25.6435ZM29.898 1.93483L24.2879 26.5548C24.2648 26.6561 24.2159 26.7496 24.1461 26.8262C24.0762 26.9028 23.9878 26.9598 23.8894 26.9917C23.7911 27.0236 23.6862 27.0293 23.585 27.0082C23.4838 26.987 23.3898 26.9398 23.3122 26.8712L10.4623 15.4987L29.8016 1.45195C29.8524 1.5201 29.8875 1.59884 29.9042 1.6824C29.9209 1.76596 29.9188 1.85221 29.898 1.93483Z" fill="black"/>
                </svg>
                <a className='name-link'> t.me//rerokai</a>
            </div>
            <svg width="9" height="16" viewBox="0 0 9 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.7475 17.3375C0.5575 17.3375 0.3675 17.2675 0.2175 17.1175C-0.0725 16.8275 -0.0725 16.3475 0.2175 16.0575L6.7375 9.5375C7.2175 9.0575 7.2175 8.2775 6.7375 7.7975L0.2175 1.2775C-0.0725 0.9875 -0.0725 0.5075 0.2175 0.2175C0.5075 -0.0725 0.987499 -0.0725 1.2775 0.2175L7.7975 6.7375C8.3075 7.2475 8.5975 7.9375 8.5975 8.6675C8.5975 9.3975 8.3175 10.0875 7.7975 10.5975L1.2775 17.1175C1.1275 17.2575 0.9375 17.3375 0.7475 17.3375Z" fill="#292D32"/>
            </svg>
          </a>
        </div>
        <div className="about-right">
          <pre className="ascii-art">{ASCII.flower}</pre>
        </div>
      </section>
      <section className="skills">
        <div className='skills-title'>
          <div className="skills-title-border"></div>
            <SvgTitle>Skills</SvgTitle>
          </div>
        <div className='skills'>
        <div className='skills-content'>
            <div className='skill-name'>
                Infrastructure/
            </div>
            <div className='skill-text'>
                <span className="highlight">Linux</span> became my main system after a period of experimenting with different operating systems,
                which is where my deeper interest in systems started. I currently run Arch on my devices and feel comfortable 
                working with almost any distribution while learning networking fundamentals through practical use.
            </div>
        </div>
        <div className='skills-content'>
            <div className='skill-name'>
                Containers/
            </div>
            <div className='skill-text'>
              Used <span className="highlight">Docker</span> to containerize services and maintain consistent, reproducible deployments across environments. Worked with <span className="highlight">Podman</span> as an alternative container runtime, particularly in rootless environments.
            </div>
        </div>
        <div className='skills-content'>
            <div className='skill-name'>
                Monitoring/
            </div>
            <div className='skill-text'>
                First encountered <Link to="/minecraft-dashboard" className="highlight" id='prg'> Prometheus and Grafana</Link> while learning about system monitoring. I enjoyed working with these tools so much that I built a mobile application as a course project that monitors infrastructure using Prometheus metrics.
            </div>
        </div>
        <div className='skills-content'>
            <div className='skill-name'>
                CI/CD/
            </div>
            <div className='skill-text'>
        Professional experience with <span className="highlight">Bamboo</span>
        {" "}for CI/CD pipeline management and build automation.
        Also experienced with <span className="highlight">GitHub Actions</span>
        {" "}for automating testing, builds, and deployment workflows.
            </div>
        </div>
        <div className='skills-content'>
            <div className='skill-name'>
                IaC/
            </div>
            <div className='skill-text'>
                I first discovered <span className="highlight">Ansible</span> while
        exploring Infrastructure as Code. Later, I gained professional
        experience developing and maintaining Ansible collections, including
        custom modules, to automate infrastructure management and configuration.
            </div>
        </div>
        <div className='skills-content'>
            <div className='skill-name'>
                PL/
            </div>
            <div className='skill-text'>
                <span className="highlight">Bash</span> came naturally from spending a lot of time in the terminal. I used <span className="highlight">Python</span> to solve mathematical problems and during a machine learning course. <span className="highlight">C++</span> was the primary programming language taught during my college studies. It was the language through which I learned core programming concepts.
            </div>
        </div>
        </div>
        <pre className="ascii-art2">{ASCII.dino}</pre>
      </section>

      <section className="contact">
        <div className="work-title">
            <div className="work-title-border"></div>
            <SvgTitle width={790}>Let's work together</SvgTitle>
        </div>
        <div className="contact-inner">
          <div className='contact-left'>
                I'm open to interesting projects, internships and engineering work. <br></br>
                If you have an opportunity or a question — feel free to send a message.
          </div>
          <div className="contact">
            <a className='link-contact' href="https://mail.google.com/mail/?view=cm&fs=1&to=rerokaiwork@gmail.com" target="_blank" rel="noopener noreferrer">
              <div className='icon-contact-link'>
                <MailIcon size={26} strokeWidth={1} />
              </div>    
              <div className='name-link'> rerokaiwork@gmail.com</div>
            </a>
            <a className='link-contact' href="https://t.me/rerokai">
              <div className='icon-contact-link'>
                  <TelegramIcon/>
              </div>
              <div className='name-link'> @rerokai</div>
            </a>
            <a className='link-contact' href="https://github.com/rerokai" >
              <div className='icon-contact-link'>
                  <GithubIcon />
              </div>
              <div className='name-link'> github.com/rerokai</div>
            </a>
            <div className='art'>
              <pre className="ascii-art3">{ASCII.girl}</pre>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}