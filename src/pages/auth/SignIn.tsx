import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback } from 'react';
import { UseAuth } from '../../auth/UseAuth';

const validationSchema = z.object({
  email: z.string().email({ message: 'O campo e-mail é obrigatório' }),
  password: z.string().min(6, { message: 'O campo senha é obrigatório' }),
});

type ValidationSchema = z.infer<typeof validationSchema>;

const SignIn: React.FC = () => {
  const { signIn } = UseAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });

  const handleSignIn = useCallback(
    async (data: ValidationSchema) => {
      try {
        const parsed = validationSchema.parse(data);
        await signIn(parsed);
      } catch (error) {
        console.error(error);
      }
    },
    [signIn],
  );

  return (
    <>
      <div className="w-screen h-screen flex justify-center items-center">
        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <form onSubmit={handleSubmit(handleSignIn)} className="space-y-6" action="#">
            <h5 className="text-xl font-medium text-gray-900 dark:text-white">Login</h5>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Seu e-mail
              </label>
              <input
                type="email"
                id="email"
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white ${errors.password && 'border-red-500'}`}
                placeholder="name@company.com"
                {...register('email')}
              />
              {errors.email && <p className="text-xs italic text-red-500 mt-2"> {errors.email?.message}</p>}
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Sua senha
              </label>
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white ${errors.password && 'border-red-500'}`}
                {...register('password')}
              />
              {errors.password && <p className="text-xs italic text-red-500 mt-2"> {errors.password?.message}</p>}
            </div>
            <div className="flex items-start">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                  />
                </div>
                <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Lembrar-me
                </label>
              </div>
              <a href="#" className="ms-auto text-sm text-blue-700 hover:underline dark:text-blue-500">
                Esqueceu a senha?
              </a>
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Login em sua conta
            </button>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
              Não está registrado?{' '}
              <a href="#" className="text-blue-700 hover:underline dark:text-blue-500">
                Criar conta
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignIn;
