'use client';

import { motion, AnimatePresence } from 'framer-motion';

const layoutVariants = {
	initial: { opacity: 0 },
	enter: { opacity: 1 },
	exit: { opacity: 0 },
};

const Template = ({ children }: React.PropsWithChildren) => {
	return (
		<AnimatePresence mode="wait">
			<motion.div
				className="overflow-hidden"
				variants={layoutVariants}
				initial="initial"
				animate="enter"
				exit="exit"
				transition={{ duration: 0.25, ease: 'easeInOut' }}
				style={{
					overflow: 'hidden',
				}}
			>
				{children}
			</motion.div>
		</AnimatePresence>
	);
};

export default Template;
