function MemberCard({ member, onSelect }) {
    return (
        <div
            className="character-card"
            onClick={onSelect}
        >

            {/* TOP BAR */}
            <div className="character-top">

                <span className="player-number">
                    {member.player}
                </span>

                <span className="character-status">
                    READY
                </span>

            </div>


            {/* PLAYER IMAGE */}
            <div className="character-image">

                <img
                    src={member.image}
                    alt={member.name}
                />

            </div>


            {/* PLAYER INFORMATION */}
            <div className="character-info">

                <p className="character-class">
                    CLASS // {member.role}
                </p>

                <h3>
                    {member.name}
                </h3>

                <div className="character-title">
                    {member.title}
                </div>

                <p className="character-description">
                    {member.description}
                </p>


                {/* SKILLS */}
                <div className="character-skills">

                    <p>
                        SKILLS
                    </p>

                    <div>
                        {member.skills.map((skill) => (
                            <span key={skill}>
                                {skill}
                            </span>
                        ))}
                    </div>

                </div>

            </div>

        </div>
    );
}

export default MemberCard;