import { NextResponse } from 'next/server';
import { supabase, supabaseAdmin } from '@/lib/supabase';
import { Category } from '@/lib/types';

export async function GET() {
    const { data, error } = await supabase
        .from('categories')
        .select('*');

    if (error) {
        console.error('Supabase error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const mappedData = data?.map(category => ({
        id: category.id,
        name: category.name,
        parentId: category.parent_id,
        group: category.group,
        productCount: category.product_count,
        imageUrl: category.image_url
    }));

    return NextResponse.json(mappedData);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Basic validation
        if (!body.name) {
            return NextResponse.json(
                { error: 'Name is required' },
                { status: 400 }
            );
        }

        const newCategory = {
            name: body.name,
            parent_id: body.parentId === 'none' ? null : body.parentId,
            group: body.group, // Optional
            product_count: 0,
            image_url: body.image || 'https://picsum.photos/seed/new/400/400', // Default image if none provided
        };

        // Use supabaseAdmin to bypass RLS policies
        const { data, error } = await supabaseAdmin
            .from('categories')
            .insert([newCategory])
            .select()
            .single();

        if (error) {
            console.error('Supabase insert error:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        // Map database snake_case to frontend camelCase if needed, or update frontend types
        // For now, let's keep frontend types consistent by mapping response
        const mappedCategory = {
            id: data.id,
            name: data.name,
            parentId: data.parent_id,
            group: data.group,
            productCount: data.product_count,
            imageUrl: data.image_url
        };

        return NextResponse.json(mappedCategory, { status: 201 });
    } catch (error) {
        console.error('Error creating category:', error);
        return NextResponse.json(
            { error: 'Failed to create category' },
            { status: 500 }
        );
    }
}
