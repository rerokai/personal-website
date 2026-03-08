import './me.css'

export function Me() {
  return (
    <div className="me-page">

      {/* Верхний блок: текст + картинка */}
      <section className="about">
        <div className="about-left">
          <h1>About me</h1>
          <p className="meta">NAME: Anastasia</p>
          <p className="meta">LOCATION: RF</p>
          <p className="meta">OCCUPATION: Dev-Ops engineer</p>
          <p className="about-text">I'm a student getting into DevOps...</p>
          <a href="https://github.com/rerokai">github.com/rerokai</a>
        </div>
        <div className="about-right">
          <img src="/tree.png" alt="decoration" />
        </div>
      </section>

      {/* Skills */}
      <section className="skills">
        <h2>Skills</h2>
        <div className="skill-row">
          <span className="skill-name">Infrastructure/</span>
          <p className="skill-desc">Linux became my main system...</p>
        </div>
        {/* остальные строки */}
      </section>

      {/* Contact */}
      <section className="contact">
        <h2>Let's Work Together</h2>
        <div className="contact-inner">
          <div className="contact-left">
            <p>rerokai@gmail.com</p>
            <p>@rerokai</p>
            <p>github.com/rerokai</p>
          </div>
          <form className="contact-form">
            <input placeholder="Name" />
            <input placeholder="Email" />
            <input placeholder="Theme" />
            <textarea placeholder="Text..." />
            <button type="submit">Send</button>
          </form>
        </div>
      </section>

    </div>
  )
}