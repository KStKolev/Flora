import '/src/stylesheet/Background/AppBackground.css';

export default function AppBackground() {
    const floraText = Array.from({ length: 40 }, (_, i) => {
        const randomX = Math.random() * 100;
        const randomY = Math.random() * 100;

        return (
            <span
                key={i}
                className="flora unselectable"
                style={{
                    animationDelay: `${i * 0.5}s`,
                    left: `${randomX}%`,
                    top: `${randomY}%`
                }}
            >
                Flora
            </span>
        );
    });

    return (
        <div className="animated-flora">
            {floraText}
        </div>
    );
}
