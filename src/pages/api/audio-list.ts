import type { NextApiRequest, NextApiResponse } from 'next';
import { list } from '@vercel/blob';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // List all blobs with the 'audio/' prefix
    const { blobs } = await list({
      prefix: 'audio/',
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    // Filter for .wav and .mp3 files and format the response
    const audioFiles = blobs
      .filter(blob => blob.pathname.endsWith('.wav') || blob.pathname.endsWith('.mp3'))
      .map(blob => ({
        url: blob.url,
        fileName: blob.pathname.split('/').pop() || '',
        size: blob.size,
        uploadedAt: blob.uploadedAt,
      }));

    res.status(200).json({ audioFiles });
  } catch (error) {
    console.error('Error listing audio files:', error);
    res.status(500).json({ error: 'Failed to list audio files', audioFiles: [] });
  }
}
