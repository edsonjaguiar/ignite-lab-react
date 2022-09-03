export function Footer() {
    return (
        <footer className="border-t border-gray-500 text-gray-300">
            <div className="w-full p-6 flex flex-col items-center justify-center">
                <p className="text-sm sm:text-base">
                    &copy;Copyright 2022{' '}
                    <a
                        href="https://github.com/edsonjaguiar"
                        target="_blank"
                        className="text-green-300 hover:text-green-700 transition-colors"
                    >
                        Edson
                    </a>
                </p>
            </div>
        </footer>
    );
}
