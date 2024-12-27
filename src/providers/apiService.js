import race from '../utils/race';

class ApiService {
  constructor() {
    this.initPosts = [
      {
        id: 1,
        title: 'useTransition: теперь ваш экран будет белым!',
        body: 'Кажется, React решил, что ошибки – это новый тренд. Белый экран смерти теперь может быть частью вашего UX, если вы забудете обрабатывать промисы внутри startTransition.',
      },
      {
        id: 2,
        title: 'useActionState: лучшее из мира антипаттернов',
        body: 'Представьте себе хук, который делает три вещи сразу, но не делает их хорошо. Ошибки не ловит, типы забывает, а смысл его существования остается загадкой.',
      },
      {
        id: 3,
        title: 'ErrorBoundary: живите прошлым!',
        body: 'React 19 напоминает нам, что ошибки — это дорого. Хотите современный подход? Устанавливайте сторонние библиотеки, как в старые добрые времена.',
      },
      {
        id: 4,
        title: 'useOptimistic: оптимизм для тех, кто верит в чудеса',
        body: 'Ожидали автоматической обработки состояний? Вместо этого получите старый добрый manual rollback. React 19 говорит: программисты слишком расслабились!',
      },
      {
        id: 5,
        title: 'Документация React: квест для смелых',
        body: 'React 19 делает чтение документации настоящим приключением. Аргументы не совпадают, примеры сбивают с толку, но это же и есть веселье, правда?',
      },
      {
        id: 6,
        title: 'Методы класса vs хуки: борьба без победителя',
        body: 'ErrorBoundary все еще живет в прошлом с методами классов. Видимо, React решил, что миграция — это слишком скучно для нас.',
      },
      {
        id: 7,
        title: 'useTransition: производительность или ловушка?',
        body: 'React 19 предлагает хук, который улучшает производительность. Ну, до тех пор, пока вы не начнете использовать его в реальных проектах.',
      },
      {
        id: 8,
        title: 'useActionState: как не делать хуки',
        body: 'Если бы можно было выпустить учебник по антипаттернам, этот хук стал бы обложкой. React 19 явно хотел нас чему-то научить.',
      },
      {
        id: 9,
        title: 'Хуки и их новые друзья: недоразумение',
        body: 'React 19 принес нам хуки, которые работают через раз. Похоже, React решил, что предсказуемость — это переоценено.',
      },
      {
        id: 10,
        title: 'React 19: прыжок в прошлое',
        body: 'Спустя 2,5 года ожидания мы получили... то, что можно было сделать за один вечер. Видимо, у команды React другое представление о времени.',
      },
    ];
  }

  getPosts() {
    return race(this.initPosts);
  }

  createPost(formData) {
    const data = Object.fromEntries(formData);
    return race({
      ...data,
      id: Math.floor(Math.random() * 1000),
    });
  }

  deletePost(postId) {
    return race(undefined);
  }

  updatePost(postId, data) {
    return race(undefined);
  }
}

const apiService = new ApiService();

export default apiService;
