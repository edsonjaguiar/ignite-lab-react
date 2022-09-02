import { yupResolver } from '@hookform/resolvers/yup';
import { AuthProvider, signInWithPopup } from 'firebase/auth';
import { GithubLogo } from 'phosphor-react';
import { FormEvent, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { Logo } from '../components/Logo';
import { firebaseAuth } from '../config/firebase-config';
import { githubProvider } from '../config/githubProvider';
import { useCreateSubscriberMutation } from '../graphql/generated';
import codeMockupImg from '/src/assets/code-mockup.png';

interface InputFormTypes {
    name: string;
    email: string;
}

interface Authentication {
    provider: string;
    name: string;
}

const validationForm = yup
    .object({
        name: yup
            .string()
            .required('O campo nome é obrigatório')
            .min(2, 'Mínimo de caracteres(2)')
            .max(100, 'Máx de caracteres(100)'),
        email: yup
            .string()
            .required('O campo email é obrigatório')
            .min(2, 'Mínimo de caracteres(2)')
            .max(100, 'Máx de caracteres(100)')
            .email('Digite um e-mail válido'),
    })
    .required();

export function Subscribe() {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<InputFormTypes>({ resolver: yupResolver(validationForm) });

    const navigate = useNavigate();

    const [createSubscriber, { loading }] = useCreateSubscriberMutation();

    const handleSubscribe: SubmitHandler<FieldValues> = async ({
        name,
        email,
    }) => {
        await createSubscriber({
            variables: {
                name,
                email,
            },
        });

        localStorage.setItem('token_access', 'true');
        navigate('/event');
    };

    const [isLogin, setIsLogin] = useState(false);

    async function login(provider: AuthProvider) {
        const result = await signInWithPopup(firebaseAuth, provider);
        setIsLogin(true);
        localStorage.setItem('token_access', 'true');
    }

    return (
        <div className="min-h-screen bg-blur bg-cover bg-no-repeat flex flex-col items-center">
            {isLogin ? (
                <>{navigate('/event')}</>
            ) : (
                <>
                    <div className="w-full max-w-[1100px] flex items-center justify-between mt-20 mx-auto sm:flex-1 flex-wrap gap-16">
                        <div className="max-w-[640px]">
                            <Logo />

                            <h1 className="mt-8 text-[2.5rem] leading-tight">
                                Construa uma{' '}
                                <strong className="text-blue-500">
                                    aplicação completa
                                </strong>
                                , do zero, com{' '}
                                <strong className="text-blue-500">React</strong>
                            </h1>

                            <p className="mt-4 text-gray-200 leading-relaxed">
                                Em apenas uma semana você vai dominar na prática
                                uma das tecnologias mais utilizadas e com alta
                                demanda para acessar as melhores oportunidades
                                do mercado.
                            </p>
                        </div>

                        <div className="p-8 bg-gray-700 border border-gray-500 rounded">
                            <strong className="text-2xl mb-6 block">
                                Inscreva-se gratuitamente
                            </strong>

                            <form
                                onSubmit={(e: FormEvent) =>
                                    handleSubmit(handleSubscribe)(e)
                                }
                                className="flex flex-col gap-2 w-full justify-center"
                            >
                                <input
                                    type="text"
                                    placeholder="Seu nome completo"
                                    className="bg-gray-900 roundend px-5 h-14"
                                    {...register('name')}
                                />
                                <p className="text-red-500">
                                    {errors.name?.message}
                                </p>

                                <input
                                    type="email"
                                    placeholder="Digite seu e-mail"
                                    className="bg-gray-900 roundend px-5 h-14"
                                    {...register('email')}
                                />
                                <p className="text-red-500">
                                    {errors.email?.message}
                                </p>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="mt-5 bg-green-500 uppercase py-4 roundend font-bold text-small hover:bg-green-700 transition-colors disabled:opacity-50"
                                >
                                    Garantir minha vaga
                                </button>
                            </form>

                            <div className="flex flex-col gap-2 w-full">
                                <p className="flex items-center mt-4">
                                    <span className="flex-1 border mr-4"></span>
                                    Ou
                                    <span className="flex-1 border ml-4"></span>
                                </p>

                                <button
                                    onClick={() => {
                                        login(githubProvider);
                                    }}
                                    type="button"
                                    className="flex justify-center gap-2 mt-5 bg-gray-800 uppercase py-4 roundend font-bold text-small hover:bg-gray-900 transition-colors"
                                >
                                    <GithubLogo size={20} />
                                    Login com Github
                                </button>
                            </div>
                        </div>
                    </div>
                    <img src={codeMockupImg} alt="" className="mt-10" />
                </>
            )}
        </div>
    );
}
