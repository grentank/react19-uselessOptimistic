import wait from './wait';

let counter = -2;

export default function race(data) {
  counter++;
  const throttle = 1500;
  const raceTime = counter % 3 === 0 && counter !== 0 ? throttle - 1 : throttle + 1; //Math.floor(Math.random() * 1 + 1001);
  console.log(`Время ожидания: ${raceTime}, время запроса: ${throttle}`);
  return Promise.race([
    new Promise((_, rej) => {
      setTimeout(() => {
        rej(new Error('Таймаут соединения'));
      }, raceTime);
    }),
    wait(throttle).then(() => data),
  ]);
}
