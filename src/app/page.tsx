import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { cn } from '@/lib/utils';
import DotPattern from '../components/magicui/dot-pattern';
import AnimatedGradientText from '@/components/magicui/animated-gradient-text';

export default async function Home() {
	const session = await getServerSession(authOptions);

	return (
		<section className="h-screen flex flex-col justify-center gap-6 p-64">
			<DotPattern
				className={cn(
					'[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]'
				)}
			/>
			<div className="flex flex-col gap-4 items-center">
				<div className="max-w-4xl mx-auto text-center space-y-8">
					{/* <p className="text-purple-400 mb-4">
						<Link
							href="#"
							className="hover:underline"
						>
							← Read about Million Lint 1.0-rc →
						</Link>
					</p> */}

					<AnimatedGradientText>
						🎉 Where every article expands your horizon
					</AnimatedGradientText>
					<h1 className="text-5xl md:text-7xl font-bold tracking-tight">
						Welcome to
						<br />
						<span className="text-blue-400">ArticleHorizon</span>
					</h1>
					<p className="text-xl">
						Explore a world of diverse articles tailored just for you. Powered
						by a cutting-edge hybrid algorithm, ArticleHorizon combines your
						unique content preferences with collaborative insights from readers
						like you. Whether it's the latest trends or niche interests, we
						bring you stories that matter.
					</p>
					{/* <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="relative bg-gray-800 rounded-lg p-2 pr-12 font-mono text-sm w-full sm:w-auto">
            $ npx million@latest
            <Button size="icon" variant="ghost" className="absolute right-2 top-1/2 -translate-y-1/2">
              <Copy className="h-4 w-4" />
              <span className="sr-only">Copy command</span>
            </Button>
          </div>
          <Button size="lg" className="bg-white text-black hover:bg-gray-200">
            Get started
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div> */}
				</div>

				<Link
					className={buttonVariants({ size: 'lg', variant: 'default' })}
					href="/home"
				>
					Start Exploring
				</Link>
			</div>
			{/* <div className="max-w-96">
				<h2 className="font-bold">Client Session:</h2>
				<User />
			</div>
			<div className="max-w-96">
				<h2 className="font-bold">Server Session:</h2>
				<p>{JSON.stringify(session)}</p>
			</div> */}
		</section>
	);
}
