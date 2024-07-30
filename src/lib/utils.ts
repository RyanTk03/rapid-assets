import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

function cn(...inputs: ClassValue[]) {
  	return twMerge(clsx(inputs))
}

function formatPrice(
	price: number | string,
	options: {
		currency?: 'USD' | 'EUR' | 'GBP' | 'BDT' | 'XOF'
		notation?: Intl.NumberFormatOptions['notation'],
		locales?: Intl.LocalesArgument
	} = {}
) {
	const { currency = 'USD', notation = 'compact', locales = 'en-US' } = options
  
	const numericPrice =
		typeof price === 'string' ? parseFloat(price) : price

	return new Intl.NumberFormat(locales, {
		style: 'currency',
		currency,
		notation,
		maximumFractionDigits: 2,
	}).format(numericPrice)
}

  export { cn, formatPrice };
  