import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { Video } from '../components/Video';

export function Event() {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('token_access')) {
            navigate('/');
        }
    }, []);

    return (
        <div className="flex flex-col lg:min-h-screen">
            <Header />
            <main className="flex flex-1 flex-col items-center gap-8 lg:flex-row lg:items-stretch lg:h-full lg:gap-0">
                {slug ? (
                    <Video lessonSlug={slug} />
                ) : (
                    <div className="flex-1" />
                )}
                <Sidebar />
            </main>
            <Footer />
        </div>
    );
}
