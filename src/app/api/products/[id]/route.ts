import { NextResponse } from 'next/server';
import { supabase, supabaseAdmin } from '@/lib/supabase';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        // Try to fetch by slug first, then by ID
        let query = supabase
            .from('products')
            .select(`
                *,
                category:categories!category_id(id, name),
                vendor:vendors!vendor_id(id, full_name, store_name, email, phone)
            `);

        // Check if id looks like a UUID or a slug
        const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);

        if (isUUID) {
            query = query.eq('id', id);
        } else {
            query = query.eq('slug', id);
        }

        const { data, error } = await query.single();

        if (error || !data) {
            console.error('Product not found:', error);
            return NextResponse.json(
                { error: 'Product not found' },
                { status: 404 }
            );
        }

        // Map database response to frontend format
        const product = {
            id: data.id,
            name: data.name,
            description: data.description || '',
            price: data.price,
            originalPrice: data.original_price,
            category: data.category?.name || 'Uncategorized',
            categoryId: data.category_id,
            subCategory: data.sub_category,
            stock: data.stock,
            imageUrls: data.image_urls || [],
            vendorId: data.vendor_id || '',
            isBestSeller: data.is_best_seller,
            isOnSale: data.is_on_sale,
            discountPrice: data.discount_price,
            sizes: data.sizes,
            colors: data.colors,
            details: data.details,
            tags: data.tags,
            sku: data.sku,
            sizeChartImageUrl: data.size_chart_url,
            slug: data.slug
        };

        const vendor = data.vendor ? {
            id: data.vendor.id,
            fullName: data.vendor.full_name,
            storeName: data.vendor.store_name,
            email: data.vendor.email,
            phone: data.vendor.phone
        } : null;

        return NextResponse.json({ product, vendor });
    } catch (error) {
        console.error('Error fetching product:', error);
        return NextResponse.json(
            { error: 'Failed to fetch product' },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();

        const updateData: any = {
            name: body.name,
            description: body.description,
            price: body.price,
            stock: body.stock,
            category_id: body.categoryId,
            is_best_seller: body.isBestSeller,
            is_on_sale: body.isOnSale,
        };

        if (body.images && body.images.length > 0) {
            updateData.image_urls = body.images;
        }
        if (body.vendorId) {
            updateData.vendor_id = body.vendorId;
        }
        if (body.originalPrice !== undefined) {
            updateData.original_price = body.originalPrice;
        }
        if (body.sizes) {
            updateData.sizes = body.sizes;
        }
        if (body.colors) {
            updateData.colors = body.colors;
        }
        if (body.subCategory) {
            updateData.sub_category = body.subCategory;
        }

        const { data, error } = await supabaseAdmin
            .from('products')
            .update(updateData)
            .eq('id', id)
            .select()
            .single();

        if (error) {
            console.error('Error updating product:', error);
            return NextResponse.json(
                { error: error.message || 'Failed to update product' },
                { status: 500 }
            );
        }

        return NextResponse.json({ product: data });
    } catch (error) {
        console.error('Error updating product:', error);
        return NextResponse.json(
            { error: 'Failed to update product' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const { error } = await supabaseAdmin
            .from('products')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting product:', error);
            return NextResponse.json(
                { error: error.message || 'Failed to delete product' },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting product:', error);
        return NextResponse.json(
            { error: 'Failed to delete product' },
            { status: 500 }
        );
    }
}

