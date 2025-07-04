import { google } from 'googleapis';
import fs from 'fs';

const SCOPES = ['https://www.googleapis.com/auth/drive.file'];
const FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID;

if (!FOLDER_ID) throw new Error('GOOGLE_DRIVE_FOLDER_ID is not set');

// Function to get credentials
function getCredentials() {
  let credentials: any = null;

  // First try to get from environment variable
  if (process.env.GOOGLE_SERVICE_ACCOUNT_KEY) {
    try {
      credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);
      console.log('Using credentials from environment variable');
    } catch (error) {
      console.error('Failed to parse GOOGLE_SERVICE_ACCOUNT_KEY from environment:', error);
    }
  }

  // Fallback to file
  if (!credentials) {
    const keyfile = './google-service-account.json';
    if (fs.existsSync(keyfile)) {
      try {
        credentials = JSON.parse(fs.readFileSync(keyfile, 'utf8'));
        console.log('Using credentials from file');
      } catch (error) {
        console.error('Failed to read google-service-account.json:', error);
      }
    }
  }

  if (!credentials) {
    throw new Error('No valid Google Service Account credentials found');
  }

  // Ensure private key is properly formatted
  if (credentials.private_key) {
    // Replace literal \n with actual newlines
    credentials.private_key = credentials.private_key.replace(/\\n/g, '\n');
  }

  return credentials;
}

// Initialize auth with better error handling
let auth: any = null;
let drive: any = null;

function initializeGoogleAuth() {
  if (!auth) {
    try {
      const credentials = getCredentials();
      
      console.log('Initializing Google Auth with credentials:', {
        type: credentials.type,
        project_id: credentials.project_id,
        client_email: credentials.client_email,
        private_key_length: credentials.private_key?.length || 0
      });
      
      auth = new google.auth.GoogleAuth({
        credentials,
        scopes: SCOPES,
      });
      
      drive = google.drive({ version: 'v3', auth });
      console.log('Google Auth initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Google Auth:', error);
      throw new Error(`Google Auth initialization failed: ${error}`);
    }
  }
  return { auth, drive };
}

// Test function to verify Google Drive connection
export async function testGoogleDriveConnection(): Promise<{ success: boolean; message: string; details?: any }> {
  try {
    const { drive } = initializeGoogleAuth();
    
    // Test by listing files in the folder
    const response = await drive.files.list({
      pageSize: 1,
      fields: 'files(id, name)',
      q: `'${FOLDER_ID}' in parents`
    });
    
    return {
      success: true,
      message: 'Google Drive connection successful',
      details: {
        folderId: FOLDER_ID,
        filesFound: response.data.files?.length || 0
      }
    };
  } catch (error: any) {
    console.error('Google Drive connection test failed:', error);
    
    return {
      success: false,
      message: 'Google Drive connection failed',
      details: {
        error: error.message,
        code: error.code,
        status: error.status
      }
    };
  }
}

export async function uploadToGoogleDrive(buffer: Buffer, filename: string, mimetype: string): Promise<string> {
  let tempPath: string | null = null;
  
  try {
    const { drive } = initializeGoogleAuth();
    
    // Save buffer to a temp file
    tempPath = `/tmp/tmp-${Date.now()}-${filename}`;
    fs.writeFileSync(tempPath, buffer);

    const fileMetadata = {
      name: filename,
      parents: [FOLDER_ID as string],
    };
    
    const media = {
      mimeType: mimetype,
      body: fs.createReadStream(tempPath),
    };

    console.log('Uploading file to Google Drive:', { filename, mimetype, folderId: FOLDER_ID });

    const file = await drive.files.create({
      requestBody: fileMetadata,
      media,
      fields: 'id',
    });

    console.log('File uploaded successfully, ID:', file.data.id);

    // Make file public
    await drive.permissions.create({
      fileId: String(file.data.id),
      requestBody: { role: 'reader', type: 'anyone' },
    });

    console.log('File permissions set to public');

    // Use the Google Drive embed format for images
    const publicUrl = `https://drive.google.com/uc?export=view&id=${file.data.id}`;

    return publicUrl;
  } catch (error: any) {
    console.error('Google Drive upload error:', {
      message: error.message,
      code: error.code,
      status: error.status,
      details: error.details
    });
    
    if (error.message?.includes('invalid_grant') || error.message?.includes('Invalid JWT')) {
      throw new Error('Google Drive authentication failed. Please check your service account credentials and ensure the private key is properly formatted.');
    }
    
    throw new Error(`Failed to upload to Google Drive: ${error.message}`);
  } finally {
    // Clean up temp file if it exists
    if (tempPath && fs.existsSync(tempPath)) {
      try {
        fs.unlinkSync(tempPath);
        console.log('Temporary file cleaned up');
      } catch (cleanupError) {
        console.error('Failed to clean up temporary file:', cleanupError);
      }
    }
  }
} 