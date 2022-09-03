import { SignOut } from 'phosphor-react';
import { useNavigate } from 'react-router-dom';
import { Logo } from './Logo';

export function Header() {
    const navigate = useNavigate();

    function logout() {
        if (localStorage.getItem('token_access')) {
            localStorage.removeItem('token_access');

            document.body.style.overflowY = 'auto';
            navigate('/');
        }
    }

    return (
        <header className="w-full py-5 flex items-center justify-between bg-gray-700 border-b border-gray-600">
            <div className="lg:m-auto ml-5">
                <Logo />
            </div>

            <div className="mr-8">
                <button
                    type="button"
                    onClick={logout}
                    className="bg-[#24292f] overflow-hidden text-white font-medium rounded p-2 flex items-center hover:bg-[#2f353d] transition-colors"
                >
                    Logout
                    <SignOut size={24} />
                </button>
            </div>
        </header>
    );
}
