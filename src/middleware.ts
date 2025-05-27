import { NextRequest, NextResponse } from 'next/server';

export const middleware = (req: NextRequest) => {
    const wealthupCookie = req.cookies.get('_wu');

    const res = NextResponse.next();

    if (wealthupCookie) {
        return res;
    }

    const now = new Date();
    const expiry = new Date(now);

    expiry.setMonth(now.getMonth() + 2);

    const _wuCookie = crypto.randomUUID();
    res.cookies.set('_wu', _wuCookie, {
        expires: expiry
    });

    return res;
}