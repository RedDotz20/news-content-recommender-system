import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { ArticleCard } from '../../../components/ArticleCard';

const HomePage = async () => {
	const session = await getServerSession(authOptions);

	if (session?.user) {
		return (
			<div className="flex items-center">
				<ArticleCard
					image="/placeholder.svg"
					title="The Rise of Sustainable Fashion"
					description="Exploring the growing movement towards eco-friendly and ethical clothing choices."
					author="John Doe"
					time="Sep 12, 2024"
					category={['Sustainability', 'Fashion']}
				/>
			</div>
		);
	}

	return <div>Please Login to see this admin page</div>;
};

export default HomePage;
