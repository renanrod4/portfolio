import SideBar from '@/components/Sidebar';
import './page.css';
import NavBar from '@/components/NavBar';

export default function Home() {
	return (
		<>
			<NavBar />
			<main>
				<SideBar />
			</main>
		</>
	);
}
