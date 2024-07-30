import Image from "next/image"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"
import { PRODUCTS_CATEGORIES } from "@/config"

type Category = (typeof PRODUCTS_CATEGORIES)[number]

interface NavItemProps {
    category: Category
    handleOpen: () => void
    handleClose: () => void
    isOpen: boolean
    isAnyOpen: boolean
}

const NavItem = ({
    isAnyOpen,
    category,
    handleOpen,
    handleClose,
    isOpen,
}: NavItemProps) => {
    return (
        <div className='flex'>
            <div className='relative flex items-center'>
                <Button
                    className='gap-1.5'
                    onClick={handleOpen}
                    variant={isOpen ? 'secondary' : 'ghost'}
                >
                    {category.label}
                    <ChevronDown
                        className={cn(
                        'h-4 w-4 transition-all text-muted-foreground',
                        {
                            '-rotate-180': isOpen,
                        }
                        )}
                    />
                </Button>
            </div>

            {isOpen ? (
                <div
                    onClick={() => handleClose()}
                    className={cn(
                        'absolute inset-x-0 top-full text-sm text-muted-foreground bg-white',
                        {
                        'animate-in fade-in-10 slide-in-from-top-5':
                            !isAnyOpen,
                        }
                    )}
                >
                    <div
                        className='absolute inset-0 top-1/2 bg-white shadow'
                        aria-hidden='true'
                    />
                    <div className='mx-auto max-w-7xl px-8'>
                        <div className='grid grid-cols-3 gap-x-8 py-16'>
                        {category.featured.map((item) => (
                            <div
                                onClick={() => handleClose}
                                key={item.name}
                                className='group relative text-base sm:text-sm'
                            >
                                <div className='relative aspect-video overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75'>
                                    <Image
                                        src={item.imageSrc}
                                        alt='product category image'
                                        fill
                                        className='object-cover object-center'
                                    />
                                </div>

                                <Link
                                    href={item.href}
                                    className='mt-6 block font-medium text-gray-900'>
                                    {item.name}
                                </Link>
                                <p
                                    className='mt-1'
                                    aria-hidden='true'>
                                    Shop now
                                </p>
                            </div>
                        ))}
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    )
}

export default NavItem