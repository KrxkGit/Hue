function rgbToHsv(rgbValue) {
    const convertRes = hexToDecimal(rgbValue);
    let r = convertRes.red, g = convertRes.green, b = convertRes.blue;
    r /= 255, g /= 255, b /= 255;
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, v = max;

    let delta = max - min;
    s = max ? (delta / max) : 0;

    if (s === 0) {
        h = 0; // achromatic
    } else {
        switch (max) {
            case r: h = (g - b) / delta + (g < b ? 6 : 0); break;
            case g: h = (b - r) / delta + 2; break;
            case b: h = (r - g) / delta + 4; break;
        }
        h /= 6;
    }

    s = s || 0; // in case s is undefined

    return { h: h * 360, s: s * 100, v: v };
}



function hexToDecimal(hexColor) {
    // 确保十六进制颜色值以 '#' 开头，并去除它
    hexColor = hexColor.substring(1);

    // 检查是否是三位数的简写形式，如果是，将其展开为六位
    if (hexColor.length === 3) {
        hexColor = hexColor.split('').map(function(hex) {
            return hex.repeat(2);
        }).join('');
    }

    // 提取前两位字符，代表红色分量，并转换为十进制数
    const redDecimal = parseInt(hexColor.substring(0, 2), 16);
    const greenDecimal = parseInt(hexColor.substring(2, 4), 16);
    const blueDecimal = parseInt(hexColor.substring(4, 6), 16);

    // 返回转换后的十进制数值
    return {'red': redDecimal, 'green': greenDecimal, 'blue': blueDecimal};
}

function rgbToHex(r, g, b) {
    // 确保每个分量的值在0到255的范围内
    r = Math.max(0, Math.min(255, r));
    g = Math.max(0, Math.min(255, g));
    b = Math.max(0, Math.min(255, b));

    // 将每个分量转换为十六进制，并填充0以确保两位数
    const toHex = (x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };

    // 拼接三个分量的十六进制字符串，并返回
    return '#' + toHex(r) + toHex(g) + toHex(b);
}


function rotateHue(hsv, rotationDegrees) {
    // 确保旋转的角度是正数
    const updateHsv = { ...hsv };
    rotationDegrees = rotationDegrees % 360;

    // 增加色相值，并确保它在0°到360°的范围内
    updateHsv.h = (hsv.h + rotationDegrees) % 360;

    // 返回更新后的HSV对象
    return updateHsv;
}

function hsvToRgb(h, s, v) {
    let r, g, b;


    h /= 60; // 缩小色相范围到 [0, 6)
    s /= 100; // 将饱和度转换为比例值
    // v /= 100; // 将值转换为比例值

    let i = Math.floor(h);
    let f = h - i; // 色相的分数部分
    let p = v * (1 - s);
    let q = v * (1 - (s * f));
    let t = v * (1 - (s * (1 - f)));

    switch (i) {
        case 0: r = v; g = t; b = p; break;
        case 1: r = q; g = v; b = p; break;
        case 2: r = p; g = v; b = t; break;
        case 3: r = p; g = q; b = v; break;
        case 4: r = t; g = p; b = v; break;
        default: r = v; g = p; b = q; break;
    }

    // 将RGB值四舍五入并乘以255
    r = Math.round(r * 255);
    g = Math.round(g * 255);
    b = Math.round(b * 255);

    return { r, g, b };
}

const rgbHsvConvertObj = {
    hsvToRgb,
    rgbToHsv,
    rotateHue
}

const hexDecimalConvertObj = {
    rgbToHex
}

export { rgbHsvConvertObj, hexDecimalConvertObj };
