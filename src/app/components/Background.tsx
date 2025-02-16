'use client';

export default function Background() {
    return (
        <div className="h-screen w-screen">
            <video 
                src="/DNA_ANI.mp4" 
                autoPlay 
                muted 
                loop 
                className="fixed top-0 left-0 w-full h-full object-cover opacity-80 bg-blue-900"
            />
            <div className="fixed top-0 left-0 w-full h-full bg-blue-900/30 backdrop-blur-sm"></div>
        </div>
    );
}