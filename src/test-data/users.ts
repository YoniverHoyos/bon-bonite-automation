const generateRandomDocument = (): string => {
  return Math.floor(
    1000000000 + Math.random() * 9000000000
  ).toString();
};

const generateUniqueEmail = (): string => {
  return `yoniver.test.${Date.now()}${Math.floor(
    Math.random() * 1000
  )}@example.com`;
};

export const testUser = {
  document: generateRandomDocument(),
  firstName: 'Yoniver',
  lastName: 'Test',
  email: generateUniqueEmail(),
  password: 'Test@123456',
};

export const updatedPersonalData = {
  birthDate: '1995-05-15',
  gender: 'Masculino',
  billingPhone: '3001234567',
};

export const checkoutData = {
  phone: '3001234567',
  country: 'Colombia',
  state: 'Amazonas',
  city: 'Leticia',
  address: 'Carrera 10 # 15-20',
};