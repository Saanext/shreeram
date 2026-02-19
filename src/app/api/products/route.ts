import { NextResponse } from 'next/server';
import { supabase, supabaseAdmin } from '@/lib/supabase';
import { slugify } from '@/lib/utils';

export async function GET() {
    const { data, error } = await supabase
        .from('products')
        .select(`
            *,
            category:categories!category_id(name),
            vendor:vendors!vendor_id(full_name, store_name)
        `);

    if (error) {
        console.error('Supabase error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const mappedData = data?.map(product => ({
        id: product.id,
        name: product.name,
        description: product.description || '',
        price: product.price,
        originalPrice: product.original_price,
        category: product.category?.name || 'Uncategorized',
        subCategory: product.sub_category,
        stock: product.stock,
        imageUrls: product.image_urls || [],
        vendorId: product.vendor_id || '',
        isBestSeller: product.is_best_seller,
        isOnSale: product.is_on_sale,
        discountPrice: product.discount_price,
        sizes: product.sizes,
        colors: product.colors,
        details: product.details,
        tags: product.tags,
        sku: product.sku,
        sizeChartImageUrl: product.size_chart_url,
        slug: product.slug
    }));

    return NextResponse.json(mappedData);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Basic validation
        if (!body.name || !body.price) {
            return NextResponse.json(
                { error: 'Name and price are required' },
                { status: 400 }
            );
        }

        const slug = slugify(body.name);

        const newProduct = {
            name: body.name,
            slug: slug, // Add slug
            description: body.description || '',
            price: body.price,
            original_price: body.originalPrice || body.price,
            stock: body.stock || 0,
            category_id: body.categoryId || null,
            vendor_id: body.vendorId || null,
            image_urls: body.images || [],
            is_best_seller: body.isBestSeller || false,
            is_on_sale: body.isOnSale || false,
            discount_price: body.discountPrice || null,
            sizes: body.sizes || null,
            details: body.details || null,
            size_chart_url: body.sizeChartUrl || null
        };

        // Use supabaseAdmin to bypass RLS policies
        const { data, error } = await supabaseAdmin
            .from('products')
            .insert([newProduct])
            .select()
            .single();

        if (error) {
            console.error('Supabase insert error:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        // Map database snake_case to frontend camelCase
        const mappedProduct = {
            id: data.id,
            name: data.name,
            description: data.description || '',
            price: data.price,
            originalPrice: data.original_price,
            stock: data.stock,
            categoryId: data.category_id,
            vendorId: data.vendor_id,
            imageUrls: data.image_urls || [],
            isBestSeller: data.is_best_seller,
            isOnSale: data.is_on_sale,
            discountPrice: data.discount_price,
            sizes: data.sizes,
            details: data.details,
            sizeChartImageUrl: data.size_chart_url
        };

        return NextResponse.json(mappedProduct, { status: 201 });
    } catch (error) {
        console.error('Error creating product:', error);
        return NextResponse.json(
            { error: 'Failed to create product' },
            { status: 500 }
        );
    }
}

