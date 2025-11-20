import type { NextApiRequest, NextApiResponse } from 'next';
import { put } from '@vercel/blob';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '100mb', // Adjust based on your file sizes
    },
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { fileName, fileData } = req.body;

    if (!fileName || !fileData) {
      return res.status(400).json({ error: 'fileName and fileData are required' });
    }

    // Validate file extension
    if (!fileName.endsWith('.wav') && !fileName.endsWith('.mp3')) {
      return res.status(400).json({ error: 'Only .wav and .mp3 files are allowed' });
    }

    // Convert base64 to buffer
    const buffer = Buffer.from(fileData, 'base64');

    // Upload to Vercel Blob
    const blob = await put(`audio/${fileName}`, buffer, {
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN,
      allowOverwrite: true, // Allow replacing existing files with same name
    });

    res.status(200).json({
      success: true,
      url: blob.url,
      fileName: fileName
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Failed to upload file' });
  }
}
