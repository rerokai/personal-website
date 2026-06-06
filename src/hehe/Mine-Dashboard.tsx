import "./dash.css"

export function MineDashboard(){
    return(
        <div className="minecraft-content">
            <div className="background-layer">
                <div className="vine">лианы</div>
                <div className="metrics">cpu</div>
                <div className="minecraft-name">MINECRAFT</div>
                <div className="minecraft-version">v1.21</div>
                <div className="tree-area">TREE</div>
                <div className="bee-space">beeeeee</div>
                <div className="grace">trava</div>
            </div>
            <div className="foreground-layer"></div>
        </div>
    )
}