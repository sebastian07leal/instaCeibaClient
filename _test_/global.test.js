import { TestScheduler } from "jest";

const h = 'hola';


it('Prueba de test', () => {
  expect(h).toMatch('hola');
});