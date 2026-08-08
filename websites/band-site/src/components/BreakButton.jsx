import { useState } from "react";

function BreakButton({
    children,
    href,
    className = "",
    onClick,
}) {
    const [breaking, setBreaking] = useState(false);

    const shards = [
        { x: "10%", y: "20%", tx: "-55px", ty: "-45px", r: "-35deg", delay: "0ms" },
        { x: "25%", y: "65%", tx: "-70px", ty: "30px", r: "45deg", delay: "20ms" },
        { x: "42%", y: "15%", tx: "-20px", ty: "-70px", r: "-65deg", delay: "35ms" },
        { x: "55%", y: "70%", tx: "15px", ty: "70px", r: "55deg", delay: "10ms" },
        { x: "70%", y: "25%", tx: "60px", ty: "-55px", r: "70deg", delay: "40ms" },
        { x: "85%", y: "60%", tx: "75px", ty: "35px", r: "-45deg", delay: "15ms" },
        { x: "35%", y: "45%", tx: "-35px", ty: "10px", r: "90deg", delay: "30ms" },
        { x: "65%", y: "48%", tx: "40px", ty: "5px", r: "-90deg", delay: "25ms" },
    ];

    const handleClick = (event) => {
        event.preventDefault();

        if (breaking) return;

        setBreaking(true);

        setTimeout(() => {
            if (onClick) {
                onClick();
            }

            if (href) {
                const target = document.querySelector(href);

                if (target) {
                    target.scrollIntoView({
                        behavior: "smooth",
                    });
                }
            }
        }, 420);

        setTimeout(() => {
            setBreaking(false);
        }, 700);
    };

    return (
        <a
            href={href}
            onClick={handleClick}
            className={`break-button ${className} ${breaking ? "is-breaking" : ""
                }`}
        >
            <span className="break-button-content">
                {children}
            </span>

            <span className="crack crack-1"></span>
            <span className="crack crack-2"></span>
            <span className="crack crack-3"></span>

            <span className="shard-container">
                {shards.map((shard, index) => (
                    <span
                        key={index}
                        className={`break-shard shard-${index}`}
                        style={{
                            "--x": shard.x,
                            "--y": shard.y,
                            "--tx": shard.tx,
                            "--ty": shard.ty,
                            "--r": shard.r,
                            "--delay": shard.delay,
                        }}
                    />
                ))}
            </span>
        </a>
    );
}

export default BreakButton;