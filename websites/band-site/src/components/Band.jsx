import members from "../data/members";
import MemberCard from "./MemberCard";
import bandPhoto from "../assets/images/team.png";

function Band({ onSelectMember }) {
    return (
        <div className="band-page">

            {/* HEADER */}

            <div className="band-header">

                <div>
                    <p className="section-label">
                        STAGE 02 // PLAYER SELECT
                    </p>

                    <h2 className="section-title">
                        SELECT YOUR
                        <br />
                        <span>BAND.</span>
                    </h2>
                </div>

                <div className="band-hud">
                    <span>PLAYERS</span>
                    <strong>04</strong>
                </div>

            </div>


            {/* TEAM PHOTO */}

            <div className="team-photo-panel">

                <div className="team-photo-top">
                    <span>
                        ◆ CIRCUIT BREAKERS ◆
                    </span>

                    <span>
                        TEAM PHOTO
                    </span>
                </div>


                <div className="team-photo-placeholder">

                    <img
                        src={bandPhoto}
                        alt="Circuit Breakers team"
                        className="team-photo-image"
                    />

                </div>


                <div className="team-photo-bottom">

                    <span>
                        TEAM // CIRCUIT BREAKERS
                    </span>

                    <span>
                        STATUS // READY
                    </span>

                </div>

            </div>


            {/* SELECT MESSAGE */}

            <div className="select-message">

                <span>◆</span>

                SELECT A PLAYER

                <span>◆</span>

            </div>


            {/* MEMBER CARDS */}

            <div className="character-grid">

                {members.map((member) => (
                    <MemberCard
                        key={member.id}
                        member={member}
                        onSelect={() => onSelectMember(member.id)}
                    />
                ))}

            </div>

        </div>
    );
}

export default Band;