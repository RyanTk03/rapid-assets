import Link from 'next/link';
import Section from '@/components/Section';
import { Button, buttonVariants } from '@/components/ui/button';
import { perks } from '@/config/perks';

const heroTailwind = "mx-auto text-center flex flex-col items-center max-w-3xl";
const titleTailwind = "text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl";
const paragraphTailwind = "mt-6 text-lg max-w-prose text-muted-foreground";
const btnGroupTailwind = "flex flex-col sm:flex-row gap-4 mt-6";
const perksTailwind = "grid grid-cols-1 gap-y-12 sm: grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0";

export default function Home() {
	return (
		<>	
			<Section className="py-20">
				<div className={heroTailwind}>
					<h1 className={titleTailwind}>
						Your market place for high-quality {' '}
						<span className="text-blue-600">
							digital assets
						</span>.
					</h1>
					<p className={paragraphTailwind}>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, quaerat!
					</p>
					<div className={btnGroupTailwind}>
						<Link href={'/products'} className={buttonVariants()}>Browse Trending</Link>
						<Button variant={"outline"}>Ours quality promise &rarr;</Button>
					</div>
				</div>
			</Section>
			<Section className="border-t border-gray-200 bg-gray-100 py-20">
				<div className={perksTailwind}>
					{perks.map((perk, index) => (
						<div className="flex flex-col items-center text-center gap-3" key={index}>
							<div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-100 text-blue-900">
								{<perk.icon className="w-1/3 h-1/3" />}
							</div>
							<h3 className="text-base font-medium text-gray-900">
								{perk.name}
							</h3>
							<p className="text-sm text-muted-foreground">
								{perk.description}
							</p>
						</div>
					))}
				</div>
			</Section>
		</>
  	);
}
