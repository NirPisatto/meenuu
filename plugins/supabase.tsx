// plugins/supabase.js
import { createClient } from '@supabase/supabase-js';

export default defineNuxtPlugin((nuxt) => {
    const config = useRuntimeConfig();
    const supabase = createClient(config.public.supabaseUrl, config.public.supabaseToken);
    return {
        provide: {
            supabase,
        },
    };
});
