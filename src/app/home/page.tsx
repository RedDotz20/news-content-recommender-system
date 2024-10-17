import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
// import { ArticleCard } from '@/components/ArticleCard';
import { CategoriesSelection } from '../../components/CategoriesSelection';

export default async function HomePage() {
	// const session = await getServerSession(authOptions);
	// console.log(session?.token);

	return (
		<div className="flex items-center justify-center w-full flex-col sm:px-4">
			{/* <h1>Home Page</h1>
			{session && <h1>Hi, {JSON.stringify(session)}</h1>} */}
			<CategoriesSelection />
		</div>
	);
}
