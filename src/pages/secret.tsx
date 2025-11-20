import { GetServerSideProps } from 'next';
import { promises as fs } from 'fs';
import path from 'path';
import Head from 'next/head';
import Header from '@/components/header';
import { useState } from 'react';

type SecretPageProps = {
    audioFiles: string[];
};

export const getServerSideProps: GetServerSideProps<SecretPageProps> = async () => {
    const audioDir = path.join(process.cwd(), 'public', 'audio');

    try {
        const files = await fs.readdir(audioDir);
        const wavFiles = files.filter(file => file.endsWith('.wav'));

        return {
            props: {
                audioFiles: wavFiles,
            },
        };
    } catch (error) {
        // If directory doesn't exist or error reading, return empty array
        return {
            props: {
                audioFiles: [],
            },
        };
    }
};

export default function Secret({ audioFiles }: SecretPageProps) {
    const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);

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
                    {audioFiles.length === 0 ? (
                        <p className="text-white text-center text-xl">nothing rn</p>
                    ) : (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
                            {audioFiles.map((fileName) => (
                                <div
                                    key={fileName}
                                    className="bg-gray-100/10 backdrop-blur-sm ring-1 ring-gray-300/20 shadow-lg rounded-xl p-6 hover:bg-gray-100/15 transition-all"
                                >
                                    <div className="flex flex-col space-y-4">
                                        <h3 className="text-xl font-bold text-white truncate" title={fileName}>
                                            {fileName.replace('.wav', '')}
                                        </h3>

                                        <audio
                                            controls
                                            className="w-full"
                                            onPlay={() => handlePlay(fileName)}
                                            onPause={handlePause}
                                            onEnded={handlePause}
                                        >
                                            <source src={`/audio/${fileName}`} type="audio/wav" />
                                            Your browser does not support the audio element.
                                        </audio>

                                        {currentlyPlaying === fileName && (
                                            <div className="flex items-center justify-center space-x-2 text-green-400 text-sm">
                                                <span>●</span>
                                                {/* <span>Now Playing</span> */}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
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
