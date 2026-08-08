function MemberCard({ member }) {
    return (
        <article className="character-card">

            <div className="character-top">
                <span className="player-number">
                    {member.player}
                </span>

                <span className="character-status">
                    READY
                </span>
            </div>

            <div className="character-image">

                {member.image ? (
                    <img
                        src={member.image}
                        alt={member.name}
                    />
                ) : (
                    <div className="character-placeholder">
                        <span>?</span>
                        <p>PLAYER IMAGE</p>
                    </div>
                )}

            </div>

            <div className="character-info">

                <p className="character-class">
                    CLASS // {member.role}
                </p>

                <h3>
                    {member.name}
                </h3>

                <p className="character-title">
                    {member.title}
                </p>

                <p className="character-description">
                    {member.description}
                </p>

                <div className="character-skills">

                    <p>SKILLS</p>

                    <div>
                        {member.skills.map((skill) => (
                            <span key={skill}>
                                {skill}
                            </span>
                        ))}
                    </div>

                </div>

            </div>

        </article>
    );
}

export default MemberCard;