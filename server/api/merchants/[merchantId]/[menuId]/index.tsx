// server/api/getData.js
import {supabase} from '~/utils/supabase';

export default defineEventHandler(async (event) => {

    // await new Promise(resolve => setTimeout(resolve, 2000));
    const { data, error } = await supabase
        .from('menus')
        .select('*')
        .eq('id', event.context.params.menuId);
    if (error) {
        throw createError({ statusCode: 500, statusMessage: error.message });
    }
    return data;
});
