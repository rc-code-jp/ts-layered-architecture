interface Env {
  [key: string]: string;
}

export const env: Env = {
  JWT_ACCESS_SECRET: 'TEST_SEC',
  JWT_REFRESH_SECRET: 'TEST_R_SEC',
};

// biome-ignore lint/complexity/noForEach: <explanation>
Object.keys(env).forEach((key) => {
  process.env[key] = env[key];
});

export const setup = (): void => {
  // biome-ignore lint/suspicious/noConsoleLog: <explanation>
  console.log('setup');
};

export const teardown = (): void => {
  // biome-ignore lint/suspicious/noConsoleLog: <explanation>
  console.log('teardown');
};
