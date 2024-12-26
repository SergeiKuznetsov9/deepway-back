module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFiles: ["./jest.setup.ts"],
  // globalSetup: './jest.globalSetup.ts', // если используете глобальную настройку
  // setupFilesAfterEnv: ['./jest.setup.ts'], // если необходимо для настроек перед тестами
  // testTimeout: 30000, // Увеличиваем таймаут для работы с моковым сервером MongoDB
};
