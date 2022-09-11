import React from "react";

export default function Guest() {
    return (
        <div className="guest--container">
            <h3 className="guest--creator">Invitation created by</h3>
            <h3 className="guest--host">DISPLAY HOST EMAIL HERE</h3>
            <hr/>
            <h3 className="guest--title">Restaurant Options</h3>
            <h4>DISPLAY RESTAURANT LIST HERE</h4>
        </div>
    )
}