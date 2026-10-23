import './projects.css'
import { ASCII } from '../me/ascii'
import SvgTitle from '../me/icons/svg_title'

export function Projects() {
    return(
        
        <div className="project-page" style={{overflowX: 'hidden'}} >

            <div className="head-projects">
                <div className="project-title">
                    <div className="project-title-border"></div>
                    <SvgTitle fontSize={64} width={900}>My projects and labs</SvgTitle>
                </div>
            </div>

            <section className="project-section">
                <div className="date">10/03/2022</div>
                <div className="project-content">
                    <div className="project-picture">some picrute</div>
                    <div className="project-block">
                        <div className="project-name">COOL NAME</div>
                        <div className="project-info">nvervoerifoeijfoiewjfoiwefnvervoerifoeijfoiewjf oiwefwjndijcnwejfnweiwennvenvervo erifoeijfoie wjfoiwefnvervoerifoe ijfoiewjfoiwefwjndijcnwejfnrvoeri foeijfoiew jfoiwefwj ndijc nwej fnweiwennvervoerif oeijfoiewjfoiwefwjndijcnwejfnweiwenwjndijcnwejfnweiwen</div>
                        <a className="project-link">
                            <button>github</button>
                        </a>
                    </div>
                </div>
            </section>

        </div>

    )
}