import { useEffect, useRef } from 'react';
import './FluidBackground.css';

const FluidBackground = () => {
    const blobPurpleRef = useRef(null);
    const blobBlueRef = useRef(null);
    const blobPinkRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (event) => {
            const { clientX, clientY } = event;

            // Update CSS variables for each blob to add mouse-based movement
            // Factors based on original code

            if (blobPurpleRef.current) {
                blobPurpleRef.current.style.setProperty('--x', `${clientX / -20}px`);
                blobPurpleRef.current.style.setProperty('--y', `${clientY / -20}px`);
            }

            if (blobBlueRef.current) {
                blobBlueRef.current.style.setProperty('--x', `${clientX / 35}px`);
                blobBlueRef.current.style.setProperty('--y', `${clientY / 35}px`);
            }

            if (blobPinkRef.current) {
                blobPinkRef.current.style.setProperty('--x', `${clientX / -50}px`);
                blobPinkRef.current.style.setProperty('--y', `${clientY / 50}px`);
            }
        };

        const handleMouseLeave = () => {
            [blobPurpleRef, blobBlueRef, blobPinkRef].forEach(ref => {
                if (ref.current) {
                    ref.current.style.setProperty('--x', '0px');
                    ref.current.style.setProperty('--y', '0px');
                }
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        document.body.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.body.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <div className="fluid-background-container">
            <div ref={blobPurpleRef} className="blob blob-purple"></div>
            <div ref={blobBlueRef} className="blob blob-blue"></div>
            <div ref={blobPinkRef} className="blob blob-pink"></div>
        </div>
    );
};

export default FluidBackground;
