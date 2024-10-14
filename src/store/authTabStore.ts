import { create } from 'zustand';

type AuthTabTypes = 'signin' | 'register';

interface AuthTabsStore {
	AuthTabs: AuthTabTypes;
	setAuthTabs: (value: AuthTabTypes) => void;
	onTabChange: (value: string) => void;
}

export const useAuthTabsStore = create<AuthTabsStore>((set) => ({
	AuthTabs: 'signin',
	setAuthTabs: (value: AuthTabTypes) => set({ AuthTabs: value }),
	onTabChange: (value: string) => {
		if (value === 'signin' || value === 'register') {
			set({ AuthTabs: value as AuthTabTypes });
		} else {
			console.warn(`Invalid tab: ${value}`);
		}
	},
}));
