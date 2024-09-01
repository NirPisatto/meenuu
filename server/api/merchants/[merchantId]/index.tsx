// server/api/getData.js
import {supabase} from '~/utils/supabase';

export default defineEventHandler(async (event) => {
    // await new Promise(resolve => setTimeout(resolve, 2000));

    const { data, error } = await supabase
        .from('shops')
        .select('*,categories(*,menus(*))')
        .eq('slug',event.context.params.merchantId);
    if (error) {
        throw createError({ statusCode: 500, statusMessage: error.message });
    }
    return data;
});
