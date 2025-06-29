import { google } from 'googleapis';
import fs from 'fs';

const SCOPES = ['https://www.googleapis.com/auth/drive.file'];
const KEYFILE = process.env.GOOGLE_SERVICE_ACCOUNT_KEY || './google-service-account.json';
const FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID;

if (!FOLDER_ID) throw new Error('GOOGLE_DRIVE_FOLDER_ID is not set');

const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILE,
  scopes: SCOPES,
});

const drive = google.drive({ version: 'v3', auth });

export async function uploadToGoogleDrive(buffer: Buffer, filename: string, mimetype: string): Promise<string> {
  // Save buffer to a temp file
  const tempPath = `./tmp-${Date.now()}-${filename}`;
  fs.writeFileSync(tempPath, buffer);

  const fileMetadata = {
    name: filename,
    parents: [FOLDER_ID as string],
  };
  const media = {
    mimeType: mimetype,
    body: fs.createReadStream(tempPath),
  };

  const file = await drive.files.create({
    requestBody: fileMetadata,
    media,
    fields: 'id',
  });

  // Make file public
  await drive.permissions.create({
    fileId: String(file.data.id),
    requestBody: { role: 'reader', type: 'anyone' },
  });

  // Use the Google Drive embed format for images
  const publicUrl = `https://drive.google.com/uc?export=view&id=${file.data.id}`;

  // Clean up temp file
  fs.unlinkSync(tempPath);

  return publicUrl;
} 