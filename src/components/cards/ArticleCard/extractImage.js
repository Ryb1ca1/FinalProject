// helpers/extractImage.js
export const extractImageFromContent = (htmlContent) => {
    if (!htmlContent) return null;

    try {
        // ✅ Приоритет 0: srcset БЕЗ media (берём ПЕРВЫЙ непустой)
        const srcsetSimple = htmlContent.match(/srcset=["\']([^"\']+)["\'](?=[^>]*(?:loading|src|>))/i);
        if (srcsetSimple && srcsetSimple[1] && srcsetSimple[1].trim().length > 0) {
            // Если несколько URL через запятую, берём первый
            const urls = srcsetSimple[1].split(',').map(u => u.trim());
            const firstUrl = urls[0].split(/\s+/)[0];
            if (firstUrl.length > 0) {
                console.log('✅ Картинка найдена в srcset (простой):', firstUrl);
                return firstUrl;
            }
        }

        // ✅ Приоритет 1: srcset с media (для responsive)
        const sourceMatch = htmlContent.match(/srcset=["\']([^"\']+\.(?:webp|jpg|png|jpeg))["\'][^>]*media=/i);
        if (sourceMatch && sourceMatch[1] && sourceMatch[1].length > 0) {
            console.log('✅ Картинка найдена в srcset (с media):', sourceMatch[1]);
            return sourceMatch[1];
        }

        // ✅ Приоритет 2: data-content-src
        const dataSrcMatch = htmlContent.match(/data-content-src=["\']([^"\']+)["\']/i);
        if (dataSrcMatch && dataSrcMatch[1] && dataSrcMatch[1].length > 0) {
            console.log('✅ Картинка найдена в data-content-src:', dataSrcMatch[1]);
            return dataSrcMatch[1];
        }

        // ✅ Приоритет 3: img src (могут быть пустые srcset перед ним, поэтому ищем последний src)
        const allSrcs = htmlContent.match(/src=["\']([^"\']*)["\'](?=[^>]*>.*?(?:<\/|$))/gi);
        if (allSrcs) {
            // ✅ Ищем ПОСЛЕДНИЙ непустой src
            for (let i = allSrcs.length - 1; i >= 0; i--) {
                const match = allSrcs[i].match(/src=["\']([^"\']+)["\']/)
                if (match && match[1] && match[1].length > 5) {  // ✅ Проверка на минимальную длину
                    console.log('✅ Картинка найдена в img src:', match[1]);
                    return match[1];
                }
            }
        }

        // ✅ Приоритет 4: Просто первый непустой src
        const imgMatch = htmlContent.match(/<img[^>]*?src=["\']([^"\']+)["\'](?=[^>]*>)/);
        if (imgMatch && imgMatch[1] && imgMatch[1].length > 0) {
            console.log('✅ Картинка найдена (простой поиск):', imgMatch[1]);
            return imgMatch[1];
        }

        console.log('⚠️ Картинка не найдена');
        return null;
    } catch (err) {
        console.error('❌ Ошибка:', err);
        return null;
    }
};
