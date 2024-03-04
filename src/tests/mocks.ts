import { vi } from 'vitest';

const useAuthMock = () => ({
  signIn: vi.fn(),
});

const zodResolverMock = () => ({
  zodResolver: vi.fn().mockImplementation(() => ({})),
});

export { useAuthMock, zodResolverMock };
