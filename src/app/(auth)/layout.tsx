interface AuthLayoutProps {
	children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
	return (
		<div className="flex items-center justify-center h-screen">{children}</div>
	);
};

export default AuthLayout;
