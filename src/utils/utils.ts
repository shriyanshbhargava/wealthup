import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import  load  from '@cashfreepayments/cashfree-js';


export const cashfree = await load({
	mode: "production" //or sandbox
});

export function cn(...classes: string[]): string {
    return classes.filter(Boolean).join(' ');
}