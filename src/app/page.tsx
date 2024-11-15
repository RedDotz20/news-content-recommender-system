import { Link } from 'next-view-transitions';
import { cn } from '@/lib/utils';
import DotPattern from '../components/magicui/dot-pattern';
import AnimatedGradientText from '@/components/magicui/animated-gradient-text';
import ShimmerButton from '@/components/ui/shimmer-button';
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
} from '@/components/ui/card';
import {
	PaperPlaneIcon,
	MobileIcon,
	CalendarIcon,
} from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';

export default async function Home() {
	return (
		<div className="min-h-screen">
			<section className="h-screen flex flex-col justify-center gap-6 px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-5">
				<DotPattern
					className={cn(
						'[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]'
					)}
				/>
				<div className="flex flex-col gap-4 items-center">
					<div className="max-w-4xl mx-auto text-center space-y-8">
						<AnimatedGradientText className="text-xs md:text-sm">
							🎉 Where every article expands your horizon
						</AnimatedGradientText>
						<h1 className="~text-3xl/6xl leading-none font-bold tracking-tight">
							Welcome to
							<br />
							<span className="text-blue-400">ArticleHorizon</span>
						</h1>

						<p className="text-sm xs:text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
							Explore a world of diverse articles tailored just for you. Powered
							by a cutting-edge hybrid algorithm, ArticleHorizon combines your
							unique content preferences with collaborative insights from
							readers like you. Whether it&apos;s the latest trends or niche
							interests, we bring you stories that matter.
						</p>

						<Link href="/home">
							<ShimmerButton>
								<span className="flex items-center justify-center gap-2 whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
									Start Exploring <PaperPlaneIcon className="ml-2" />
								</span>
							</ShimmerButton>
						</Link>
					</div>
				</div>
			</section>
		</div>
	);
}
