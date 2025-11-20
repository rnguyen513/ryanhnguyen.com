import Head from 'next/head';
import Header from '@/components/header';
import { useState, useEffect } from 'react';

type AudioFile = {
    url: string;
    fileName: string;
    size: number;
    uploadedAt: string;
};

export default function Secret() {
    const [audioFiles, setAudioFiles] = useState<AudioFile[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);

    useEffect(() => {
        async function fetchAudioFiles() {
            try {
                const response = await fetch('/api/audio-list');
                const data = await response.json();
                setAudioFiles(data.audioFiles || []);
            } catch (error) {
                console.error('Error fetching audio files:', error);
                setAudioFiles([]);
            } finally {
                setLoading(false);
            }
        }

        fetchAudioFiles();
    }, []);

    const handlePlay = (fileName: string) => {
        setCurrentlyPlaying(fileName);
    };

    const handlePause = () => {
        setCurrentlyPlaying(null);
    };

    return (
        <>
            <Head>
                <title>stash</title>
            </Head>

            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
                <Header />

                <div className="container mx-auto px-4 py-12">
                    {loading ? (
                        <p className="text-white text-center text-xl">loading...</p>
                    ) : audioFiles.length === 0 ? (
                        <p className="text-white text-center text-xl">nothing rn</p>
                    ) : (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
                            {audioFiles.map((audioFile) => {
                                const fileExtension = audioFile.fileName.endsWith('.mp3') ? 'mp3' : 'wav';
                                const displayName = audioFile.fileName.replace(/\.(wav|mp3)$/, '');

                                return (
                                    <div
                                        key={audioFile.fileName}
                                        className="bg-gray-100/10 backdrop-blur-sm ring-1 ring-gray-300/20 shadow-lg rounded-xl p-6 hover:bg-gray-100/15 transition-all"
                                    >
                                        <div className="flex flex-col space-y-4">
                                            <h3 className="text-xl font-bold text-white truncate" title={audioFile.fileName}>
                                                {displayName}
                                            </h3>

                                            <audio
                                                controls
                                                preload="none"
                                                className="w-full"
                                                onPlay={() => handlePlay(audioFile.fileName)}
                                                onPause={handlePause}
                                                onEnded={handlePause}
                                            >
                                                <source src={audioFile.url} type={`audio/${fileExtension}`} />
                                                Your browser does not support the audio element.
                                            </audio>

                                            <a
                                                href={audioFile.url}
                                                download={audioFile.fileName}
                                                className=""
                                                target="_blank"
                                            >
                                                <svg
                                                    className="w-4 h-4 mr-2"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                                    />
                                                </svg>
                                            </a>

                                            {currentlyPlaying === audioFile.fileName && (
                                                <div className="flex items-center justify-center space-x-2 text-green-400 text-sm">
                                                    <span>●</span>
                                                    {/* <span>Now Playing</span> */}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* <div className="mt-12 text-center">
            <p className="text-gray-400 text-sm">
              Found {audioFiles.length} audio file{audioFiles.length !== 1 ? 's' : ''}
            </p>
          </div> */}
                </div>
            </div>
        </>
    );
}
