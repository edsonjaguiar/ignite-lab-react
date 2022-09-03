import { CaretCircleLeft } from 'phosphor-react';
import ReactLottie from 'react-lottie';
import { Link } from 'react-router-dom';
import rocket from '../assets/rocket.json';

const defaultOptions = {
    loop: true,
    autoplay: true,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
    },
};

export function PageNotFound() {
    return (
        <div className="flex items-center justify-center gap-20">
            <div className="hidden lg:block lg:visible">
                <ReactLottie
                    options={{ animationData: rocket, ...defaultOptions }}
                    width={500}
                    height={500}
                />
            </div>

            <div className="h-screen flex flex-col items-center justify-center">
                <h1 className="text-6xl font-bold text-red-500 sm:text-8xl">
                    Error 404!
                </h1>
                <p className="text-sm mt-4 text-center text-gray-300 sm:text-base">
                    A página que você requisitou não encontrada
                </p>

                <Link
                    to="/"
                    className="mt-8 text-sm uppercase font-bold p-4 rounded bg-[#24292f] hover:bg-[#2f353d] transition-colors flex items-center justify-center gap-[10px]"
                >
                    <CaretCircleLeft size={24} />
                    Voltar para a página inicial
                </Link>
            </div>
        </div>
    );
}
