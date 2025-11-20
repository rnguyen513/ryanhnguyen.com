/**
 * Upload Script for Vercel Blob
 *
 * This script uploads all .wav and .mp3 files from /public/audio to Vercel Blob storage.
 *
 * Usage:
 *   node upload-to-blob.js
 *
 * Requirements:
 *   - BLOB_READ_WRITE_TOKEN environment variable must be set in .env
 */

const { put } = require('@vercel/blob');
const fs = require('fs').promises;
const path = require('path');
require('dotenv').config();

async function uploadAudioFiles() {
  const audioDir = path.join(__dirname, 'public', 'audio');

  try {
    // Check if BLOB_READ_WRITE_TOKEN is set
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      console.error('❌ Error: BLOB_READ_WRITE_TOKEN not found in environment variables');
      console.log('Please add it to your .env file:');
      console.log('BLOB_READ_WRITE_TOKEN=your_token_here');
      process.exit(1);
    }

    // Read all files from the audio directory
    const files = await fs.readdir(audioDir);
    const audioFiles = files.filter(file => file.endsWith('.wav') || file.endsWith('.mp3'));

    if (audioFiles.length === 0) {
      console.log('📂 No audio files found in /public/audio');
      return;
    }

    console.log(`📤 Found ${audioFiles.length} audio file(s) to upload:\n`);

    for (const fileName of audioFiles) {
      const filePath = path.join(audioDir, fileName);
      const fileBuffer = await fs.readFile(filePath);
      const fileSizeMB = (fileBuffer.length / 1024 / 1024).toFixed(2);

      console.log(`   Uploading: ${fileName} (${fileSizeMB} MB)...`);

      try {
        const blob = await put(`audio/${fileName}`, fileBuffer, {
          access: 'public',
          token: process.env.BLOB_READ_WRITE_TOKEN,
          allowOverwrite: true, // Allow replacing existing files with same name
        });

        console.log(`   ✅ Success: ${blob.url}\n`);
      } catch (error) {
        console.error(`   ❌ Failed to upload ${fileName}:`, error.message, '\n');
      }
    }

    console.log('🎉 Upload complete!');
    console.log('\nNext steps:');
    console.log('1. Test the /secret page to see your uploaded files');
    console.log('2. Once confirmed working, you can delete /public/audio to reduce deployment size');

  } catch (error) {
    console.error('❌ Error reading audio directory:', error.message);
    console.log(`\nMake sure the directory exists: ${audioDir}`);
  }
}

uploadAudioFiles();
