import {useLocation} from 'react-router-dom';
import {useEffect} from 'react';


export const ScrollToTop = () => {
	/* The pathname will change on every page-transition,
     * and we take advantage of this to trigger scroll-to-top. */
	const {pathname} = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return null;
};
