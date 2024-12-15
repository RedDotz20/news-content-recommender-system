import Link from 'next/link';
import { cn } from '@/lib/utils';
import DotPattern from '../components/magicui/dot-pattern';
import AnimatedGradientText from '@/components/magicui/animated-gradient-text';
import ShimmerButton from '@/components/ui/shimmer-button';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PaperPlaneIcon, MobileIcon, CalendarIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';

const features = [
  {
    title: 'Responsive Design',
    description:
      'Stay connected on-the-go! ArticleHorizon adapts to any screen size, ensuring a smooth experience on any device.'
  },
  {
    title: 'Curated Feed',
    description:
      'Dive into content that matters. Our smart algorithms analyze your reading habits to deliver personalized recommendations.'
  },
  {
    title: 'Diverse Content',
    description:
      'Expand your horizons with a wide range of topics. Discover new interests and stay informed across various fields and topics.'
  }
];

export default function Home() {
  return (
    <div className="min-h-screen">
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-5">
        <DotPattern
          className={cn(
            'absolute inset-0 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]'
          )}
        />
        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-4 text-center xs:px-6">
          <AnimatedGradientText className="text-xs sm:text-sm">
            🎉 Where every news expands your horizon
          </AnimatedGradientText>
          <h1 className="text-3xl font-bold tracking-tight xs:text-4xl sm:text-5xl md:text-6xl">
            Welcome to
            <br />
            <span className="text-blue-400">ArticleHorizon</span>
          </h1>

          <p className="mx-auto max-w-2xl text-sm xs:text-base sm:text-lg md:text-xl">
            Explore a world of diverse articles tailored just for you. Powered by a cutting-edge
            hybrid algorithm, ArticleHorizon combines your unique content preferences with
            collaborative insights from readers like you. Whether it&apos;s the latest trends or
            niche interests, we bring you stories that matter.
          </p>

          <Link href="/home" className="mt-8">
            <ShimmerButton>
              <span className="flex items-center justify-center gap-2 whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                Start Exploring <PaperPlaneIcon className="ml-2" />
              </span>
            </ShimmerButton>
          </Link>
        </div>
      </section>

      <section className="flex flex-col justify-center bg-gray-50 px-4 py-12 dark:bg-gray-900 sm:px-6 md:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 text-center text-3xl font-bold xs:text-4xl sm:text-5xl">
            Our Core Features
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="transform transition-transform duration-500 hover:translate-y-[-4px] hover:scale-105 hover:cursor-default hover:select-none"
              >
                <CardHeader>
                  <CardTitle className="text-xl hover:cursor-default hover:select-none xs:text-2xl sm:text-xl md:text-2xl">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-sm hover:cursor-default hover:select-none xs:text-base">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="flex flex-col justify-center bg-gradient-to-b from-white to-gray-300 px-6 py-12 dark:from-gray-900 dark:to-gray-700 sm:px-6 md:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center justify-between gap-12 lg:flex-row">
            <div className="max-w-xl flex-1">
              <h1 className="mb-6 text-2xl font-bold xs:text-3xl sm:text-4xl md:text-5xl">
                Ready to Expand Your Horizon?
              </h1>
              <p className="mb-6 text-base xs:text-lg">
                Join ArticleHorizon today and unlock a world of knowledge tailored just for you.
                Start your journey of discovery with these amazing benefits:
              </p>
              <ul className="space-y-2 text-sm xs:text-base">
                <li className="flex items-center">
                  <MobileIcon className="mr-2 h-5 w-5 flex-shrink-0 text-cyan-400" />
                  <span>Personalized content recommendations</span>
                </li>
                <li className="flex items-center">
                  <CalendarIcon className="mr-2 h-5 w-5 flex-shrink-0 text-cyan-400" />
                  <span>Daily curated articles on trending topics</span>
                </li>
              </ul>

              <div className="mt-6">
                <Link href="/home">
                  <Button className="rounded-xl p-4 text-sm text-gray-900 duration-200 hover:bg-gray-900 hover:text-white xs:p-6 xs:text-base">
                    Start Exploring <PaperPlaneIcon className="ml-2" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="w-full max-w-md flex-1">
              <Card className="h-full w-full overflow-hidden bg-gray-900 shadow-xl shadow-gray-900 dark:bg-gray-200">
                <CardHeader className="p-6">
                  <CardTitle className="mb-4 text-xl font-bold text-white dark:text-gray-900 xs:text-2xl">
                    Your Personal Article Feed
                  </CardTitle>
                  <CardDescription>
                    <span className="grid grid-cols-2 gap-4">
                      {[...Array(6)].map((_, index) => (
                        <span
                          key={index}
                          className="aspect-square animate-pulse rounded-lg bg-gray-200 dark:bg-gray-400"
                          aria-hidden="true"
                        />
                      ))}
                    </span>
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
