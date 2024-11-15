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

export default function Home() {
  return (
    <div className="min-h-screen">
      <section className="min-h-screen flex flex-col justify-center items-center px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-5 relative overflow-hidden">
        <DotPattern
          className={cn(
            "absolute inset-0 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
          )}
        />
        <div className="flex flex-col gap-4 items-center relative z-10 max-w-4xl mx-auto xs:px-6 text-center">
          <AnimatedGradientText className="text-xs sm:text-sm">
            🎉 Where every article expands your horizon
          </AnimatedGradientText>
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            Welcome to
            <br />
            <span className="text-blue-400">ArticleHorizon</span>
          </h1>

          <p className="text-sm xs:text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
            Explore a world of diverse articles tailored just for you. Powered
            by a cutting-edge hybrid algorithm, ArticleHorizon combines your
            unique content preferences with collaborative insights from readers
            like you. Whether it&apos;s the latest trends or niche interests, we
            bring you stories that matter.
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

      <section className="flex flex-col justify-center py-12 px-4 sm:px-6 md:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl xs:text-4xl sm:text-5xl font-bold text-center mb-8">
            Our Core Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="transform transition-transform duration-500 hover:translate-y-[-4px] hover:scale-105 hover:select-none hover:cursor-default">
              <CardHeader>
                <CardTitle className="text-xl xs:text-2xl sm:text-xl md:text-2xl hover:select-none hover:cursor-default">
                  Responsive Design
                </CardTitle>
                <CardDescription className="text-sm xs:text-base hover:select-none hover:cursor-default">
                  Stay connected on-the-go! ArticleHorizon adapts to 
                  any screen size, ensuring a smooth experience on any device.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="transform transition-transform duration-500 hover:translate-y-[-4px] hover:scale-105 hover:select-none hover:cursor-default">
              <CardHeader>
                <CardTitle className="text-xl xs:text-2xl sm:text-xl md:text-2xl hover:select-none hover:cursor-default">
                  Curated Feed
                </CardTitle>
                <CardDescription className="text-sm xs:text-base hover:select-none hover:cursor-default">
                  Dive into content that matters. Our smart algorithms analyze
                  your reading habits to deliver personalized recommendations.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="transform transition-transform duration-500 hover:translate-y-[-4px] hover:scale-105 hover:select-none hover:cursor-default">
              <CardHeader>
                <CardTitle className="text-xl xs:text-2xl sm:text-xl md:text-2xl hover:select-none hover:cursor-default">
                  Diverse Content
                </CardTitle>
                <CardDescription className="text-sm xs:text-base hover:select-none hover:cursor-default">
                  Expand your horizons with a wide range of topics. Discover new
                  interests and stay informed across various fields and topics.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <section className="flex flex-col justify-center py-12 px-6 sm:px-6 md:px-8 bg-gradient-to-b from-white to-gray-300 dark:from-gray-900 dark:to-gray-700">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="flex-1 max-w-xl">
              <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                Ready to Expand Your Horizon?
              </h1>
              <p className="text-base xs:text-lg mb-6">
                Join ArticleHorizon today and unlock a world of knowledge
                tailored just for you. Start your journey of discovery with
                these amazing benefits:
              </p>
              <ul className="space-y-2 text-sm xs:text-base">
                <li className="flex items-center">
                  <MobileIcon className="mr-2 h-5 w-5 text-cyan-400 flex-shrink-0" />
                  <span>Personalized content recommendations</span>
                </li>
                <li className="flex items-center">
                  <CalendarIcon className="mr-2 h-5 w-5 text-cyan-400 flex-shrink-0" />
                  <span>Daily curated articles on trending topics</span>
                </li>
              </ul>

              <div className="mt-6">
                <Link href="/home">
                  <Button className="rounded-xl text-gray-900 text-sm xs:text-base p-4 xs:p-6 hover:bg-gray-900 hover:text-white duration-200">
                    Start Exploring <PaperPlaneIcon className="ml-2" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="flex-1 w-full max-w-md">
              <Card className="w-full h-full bg-gray-900 dark:bg-gray-200 overflow-hidden shadow-xl shadow-gray-900">
                <CardHeader className="p-6">
                  <CardTitle className="text-xl xs:text-2xl font-bold mb-4 text-white dark:text-gray-900">
                    Your Personal Article Feed
                  </CardTitle>
                  <CardDescription>
                    <div className="grid grid-cols-2 gap-4">
                      {[...Array(6)].map((_, index) => (
                        <div
                          key={index}
                          className="aspect-square bg-gray-200 dark:bg-gray-400 rounded-lg animate-pulse"
                          aria-hidden="true"
                        />
                      ))}
                    </div>
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
