import { NextApiRequest, NextApiResponse } from 'next';
import cloudinary from '@/lib/cloudinary';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '50mb',
    },
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { file, folder = 'studio-hrl-adult', resourceType = 'auto' } = req.body;

    if (!file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    const uploadResult = await cloudinary.uploader.upload(file, {
      folder,
      resource_type: resourceType,
      overwrite: true,
      invalidate: true,
    });

    return res.status(200).json({
      success: true,
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id,
      format: uploadResult.format,
      resourceType: uploadResult.resource_type,
      bytes: uploadResult.bytes,
      width: uploadResult.width,
      height: uploadResult.height,
      duration: uploadResult.duration,
    });
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    return res.status(500).json({
      error: 'Upload failed',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
