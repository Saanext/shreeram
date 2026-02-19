import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json(
                { error: 'No file provided' },
                { status: 400 }
            );
        }

        const fileExt = file.name.split('.').pop();
        const fileName = `${uuidv4()}.${fileExt}`;
        const filePath = `${fileName}`;
        const bucketName = 'product-images';

        // Check if bucket exists, if not create it
        const { data: bucketData, error: bucketError } = await supabaseAdmin
            .storage
            .getBucket(bucketName);

        if (bucketError) {
            const { data: newBucket, error: createError } = await supabaseAdmin
                .storage
                .createBucket(bucketName, {
                    public: true,
                    fileSizeLimit: 1024 * 1024 * 5, // 5MB
                    allowedMimeTypes: ['image/*']
                });

            if (createError) {
                console.error('Failed to create bucket:', createError);
                return NextResponse.json({ error: 'Failed to configure storage: ' + createError.message }, { status: 500 });
            }
        }

        const { data, error } = await supabaseAdmin
            .storage
            .from(bucketName)
            .upload(filePath, file, {
                contentType: file.type,
                upsert: false
            });

        if (error) {
            console.error('Supabase storage upload error:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        const { data: { publicUrl } } = supabaseAdmin
            .storage
            .from('product-images')
            .getPublicUrl(filePath);

        return NextResponse.json({ url: publicUrl }, { status: 200 });
    } catch (error) {
        console.error('Error uploading image:', error);
        return NextResponse.json(
            { error: 'Failed to upload image' },
            { status: 500 }
        );
    }
}
